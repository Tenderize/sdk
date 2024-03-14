import { TenderizerAbi } from "@lib/abis";
import { SUBGRAPHS, TokenSlugEnums } from "@lib/constants";
import type { Unlock } from "@lib/types/global";
import { graphqlFetch } from "@lib/utils/graphqlFetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getWalletClient,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import type { Address } from "viem";
import { simulateContract } from "viem/actions";
import type { Config } from "wagmi";
import { useConfig } from "wagmi";

export const useUnlocks = (
  asset: TokenSlugEnums,
  tenderizer: Address,
  user: Address,
  chainId: number
) => {
  const {
    data: unlocks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["unlocks", tenderizer, user],
    queryFn: async () => {
      user = user.toLowerCase() as Address;
      try {
        const query = `query Unlocks($tenderizer: String!, $user: String!) {
                unlocks(where: { tenderizer: $tenderizer, user: $user }) {
                    id
                    amount
                    timestamp
                    maturity
                    }
                }`;
        const data = await graphqlFetch(SUBGRAPHS[chainId], query, {
          tenderizer,
          user,
        });
        data.unlocks.map((u: Unlock) => {
          return {
            ...u,
            asset,
          };
        });
        return data.unlocks as Unlock[];
      } catch (err) {
        console.log(err);
      }
    },
  });
  return { unlocks, isLoading, error };
};

export const useUnstake = (
  tenderizer: Address,
  amount: bigint,
  chainId: number
) => {
  const wagmiConfig = useConfig();
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        return await unlock(tenderizer, amount, chainId, wagmiConfig);
      } catch (err) {
        console.log(err);
      }
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

const unlock = async (
  tenderizer: Address,
  amount: bigint,
  chainId: number,
  wagmiConfig: Config
) => {
  const signer = await getWalletClient(wagmiConfig);
  if (!signer) return;
  try {
    const { request: unlock } = await simulateContract(signer, {
      address: tenderizer,
      abi: TenderizerAbi,
      functionName: "unlock",
      args: [amount],
    });

    const hash = await writeContract(wagmiConfig, unlock);

    await waitForTransactionReceipt(wagmiConfig, { hash, chainId });

    return hash;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
