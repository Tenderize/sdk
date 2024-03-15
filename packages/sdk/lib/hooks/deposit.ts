import { TenderizerAbi } from "@lib/abis";
import { type ERC2612Permit } from "@lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  estimateGas,
  getGasPrice,
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
  request: any, // TODO: replace with a proper type
  chainId: number,
  permit?: ERC2612Permit
) => {
  const wagmiConfig = useConfig();
  const mutation = useMutation({
    mutationFn: async () => {
      if (!request) return;
      const hash = await writeContract(wagmiConfig, request);
      if (!permit) {
        await waitForTransactionReceipt(wagmiConfig, { hash, chainId });
      }
      return hash;
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

export const useSimulateDeposit = (
  tenderizer: Address,
  amount: bigint,
  chainId: number,
  permit?: ERC2612Permit
) => {
  const wagmiConfig = useConfig();
  const mutation = useMutation({
    mutationFn: async () => {
      if (amount === 0n) return;
      const asset = await readContract(wagmiConfig, {
        address: tenderizer,
        abi: TenderizerAbi,
        functionName: "asset",
        chainId,
      });
      return permit
        ? simulateWithPermit(
            asset,
            tenderizer,
            amount,
            permit,
            chainId,
            wagmiConfig
          )
        : simulateWithApprove(tenderizer, amount, chainId, wagmiConfig);
    },
  });

  return mutation;
};

const simulateWithPermit = async (
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
    const estimatedGasPrice = await getGasPrice(wagmiConfig, { chainId });
    const gas = await estimateGas(wagmiConfig, request);
    return { request, estimatedGas: gas, estimatedGasPrice };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const simulateWithApprove = async (
  tenderizer: Address,
  amount: bigint,
  chainId: number,
  wagmiConfig: Config
) => {
  const publicClient = getPublicClient(wagmiConfig, { chainId });
  const signer = await getWalletClient(wagmiConfig);

  if (!publicClient) return;

  try {
    const { request } = await simulateContract(signer, {
      address: tenderizer,
      abi: TenderizerAbi,
      functionName: "deposit",
      args: [signer.account.address, amount],
    });
    const estimatedGasPrice = await getGasPrice(wagmiConfig, { chainId });
    const gas = await estimateGas(wagmiConfig, request);
    return { request, estimatedGas: gas, estimatedGasPrice };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
