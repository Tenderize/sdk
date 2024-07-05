import { TenderizerAbi } from "@lib/abis";
import { SUBGRAPHS } from "@lib/constants";
import { graphqlFetch } from "@lib/utils/graphqlFetch";
import { useQuery } from "@tanstack/react-query";
import type { Address } from "viem";
import { useReadContracts } from "wagmi";

export const useTenderizerStats = (tenderizer: Address, chainId: number) => {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tenderizerStats", tenderizer],
    queryFn: async () => {
      const query = `query ($id: ID!) {
                tenderizer(id: $id) {
                    tvl
                    apy
                }
            }`;
      const data = await graphqlFetch(SUBGRAPHS[chainId], query, {
        id: tenderizer,
      });
      console.log(data);
      return { tvl: data.tenderizer.tvl, apy: data.tenderizer.apy };
    },
  });
  return { stats: stats ?? { tvl: "0", apy: "0" }, isLoading, error };
};

export const useTenderizerData = (tenderizer: Address, chainId: number) => {
  const { data, isLoading, error } = useReadContracts({
    contracts: [
      {
        abi: TenderizerAbi,
        address: tenderizer,
        functionName: "validator",
        chainId,
      },
    ],
  });

  return {
    data: {
      validator: data?.[0].result || ("" as Address),
    },
    isLoading,
    error,
  };
};
