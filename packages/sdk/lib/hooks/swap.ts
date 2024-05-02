import { TenderSwapAbi, TenderizerAbi } from "@lib/abis";
import { TokenSlugEnums } from "@lib/constants/enums";
import { TOKENS } from "@lib/constants/tokens";
import { type ERC2612Permit } from "@lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  getPublicClient,
  getWalletClient,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { Interface } from "ethers/lib/utils";
import { type Address, type Hex } from "viem";
import { simulateContract } from "viem/actions";
import { useConfig, useReadContract, type Config } from "wagmi";

export type UseQuote = (
  asset: TokenSlugEnums,
  tenderizer: Address,
  amount: bigint,
  chainId: number
) => {
  quote: { out: bigint; fee: bigint };
  isLoading: boolean;
  isError: boolean;
};

export const useQuote: UseQuote = (asset, tenderizer, amount, chainId) => {
  const { data, isLoading, isError } = useReadContract({
    address: TOKENS[asset]?.tenderswap,
    functionName: "quote",
    args: [tenderizer, amount],
    abi: TenderSwapAbi,
    chainId,
    query: {
      enabled: !!amount,
    },
  });

  return {
    quote: { out: data?.[0] ?? 0n, fee: data?.[1] ?? 0n },
    isLoading,
    isError,
  };
};

export const useSwap = (
  tenderswap: Address,
  tenderizer: Address,
  amount: bigint,
  minOut: bigint,
  chainId: number,
  permit?: ERC2612Permit
) => {
  const wagmiConfig = useConfig();
  const mutation = useMutation({
    mutationFn: async () => {
      return permit
        ? swapWithPermit(
            tenderswap,
            tenderizer,
            amount,
            minOut,
            permit,
            chainId,
            wagmiConfig
          )
        : swapWithApprove(
            tenderswap,
            tenderizer,
            amount,
            minOut,
            chainId,
            wagmiConfig
          );
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

const swapWithPermit = async (
  tenderswap: Address,
  tenderizer: Address,
  amount: bigint,
  minOut: bigint,
  permit: ERC2612Permit,
  chainId: number,
  wagmiConfig: Config
) => {
  const ITenderizer = new Interface(TenderizerAbi);
  const publicClient = getPublicClient(wagmiConfig, { chainId });

  if (!publicClient) return;

  try {
    const { request } = await simulateContract(publicClient, {
      address: tenderswap,
      abi: TenderSwapAbi,
      functionName: "multicall",
      args: [
        [
          ITenderizer.encodeFunctionData("selfPermit", [
            tenderizer,
            permit.value,
            permit.deadline,
            permit.v,
            permit.r,
            permit.s,
          ]) as Hex,
          ITenderizer.encodeFunctionData("swap", [
            tenderizer,
            amount,
            minOut,
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

const swapWithApprove = async (
  tenderswap: Address,
  tenderizer: Address,
  amount: bigint,
  minOut: bigint,
  chainId: number,
  wagmiConfig: Config
) => {
  const publicClient = getPublicClient(wagmiConfig, { chainId });
  const signer = await getWalletClient(wagmiConfig);
  if (!publicClient) return;

  try {
    const { request: swap } = await simulateContract(signer, {
      address: tenderswap,
      abi: TenderSwapAbi,
      functionName: "swap",
      args: [tenderizer, amount, minOut],
    });

    const hash = await writeContract(wagmiConfig, swap);

    await waitForTransactionReceipt(wagmiConfig, { hash, chainId });

    return hash;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
