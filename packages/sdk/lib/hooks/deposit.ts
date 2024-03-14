import { TenderizerAbi } from "@lib/abis";
import { type ERC2612Permit } from "@lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  getPublicClient,
  getWalletClient,
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { Interface } from "ethers/lib/utils";
import { type Address, type Hex } from "viem";
import { simulateContract } from "viem/actions";
import { useConfig, useReadContract, type Config } from "wagmi";

export type UsePreviewDeposit = (
  tenderizer: Address,
  amount: bigint,
  chainId?: number
) => {
  previewDeposit: bigint;
  isLoading: boolean;
  isError: boolean;
  chainId: number;
};

export const usePreviewDeposit = (
  tenderizer: Address,
  amount: bigint,
  chainId: number
) => {
  const {
    data: previewDeposit,
    isLoading,
    isError,
  } = useReadContract({
    address: tenderizer,
    functionName: "previewDeposit",
    args: [amount],
    abi: TenderizerAbi,
    chainId,
  });

  return { previewDeposit, isLoading, isError };
};

export const useDeposit = (
  tenderizer: Address,
  amount: bigint,
  chainId: number,
  permit?: ERC2612Permit
) => {
  const wagmiConfig = useConfig();
  const mutation = useMutation({
    mutationFn: async () => {
      const asset = await readContract(wagmiConfig, {
        address: tenderizer,
        abi: TenderizerAbi,
        functionName: "asset",
        chainId,
      });
      return permit
        ? depositWithPermit(
            asset,
            tenderizer,
            amount,
            permit,
            chainId,
            wagmiConfig
          )
        : depositWithApprove(tenderizer, amount, chainId, wagmiConfig);
    },
    onSuccess: () => {
      // Reset the mutation status to idle after success
      setTimeout(() => {
        mutation.reset();
      }, 2000);
    },
  });

  return mutation;
};

const depositWithPermit = async (
  asset: Address,
  tenderizer: Address,
  amount: bigint,
  permit: ERC2612Permit,
  chainId: number,
  wagmiConfig: Config
) => {
  const ITenderizer = new Interface(TenderizerAbi);
  const publicClient = getPublicClient(wagmiConfig, { chainId });
  const signer = await getWalletClient(wagmiConfig);

  if (!publicClient) return;

  try {
    const { request } = await simulateContract(publicClient, {
      address: tenderizer,
      abi: TenderizerAbi,
      functionName: "multicall",
      args: [
        [
          ITenderizer.encodeFunctionData("selfPermit", [
            asset,
            permit.value,
            permit.deadline,
            permit.v,
            permit.r,
            permit.s,
          ]) as Hex,
          ITenderizer.encodeFunctionData("deposit", [
            signer.account.address,
            amount,
          ]) as Hex,
        ],
      ],
    });

    const hash = await writeContract(wagmiConfig, request);

    return hash;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const depositWithApprove = async (
  tenderizer: Address,
  amount: bigint,
  chainId: number,
  wagmiConfig: Config
) => {
  const publicClient = getPublicClient(wagmiConfig, { chainId });
  const signer = await getWalletClient(wagmiConfig);
  if (!publicClient) return;

  try {
    const { request: deposit } = await simulateContract(signer, {
      address: tenderizer,
      abi: TenderizerAbi,
      functionName: "deposit",
      args: [signer.account.address, amount],
    });

    const hash = await writeContract(wagmiConfig, deposit);

    await waitForTransactionReceipt(wagmiConfig, { hash, chainId });

    return hash;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
