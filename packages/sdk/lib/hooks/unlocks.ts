import { TenderizerAbi } from "@lib/abis";
import { SUBGRAPHS } from "@lib/constants";
import type { Balance } from "@lib/types/global";
import { graphqlFetch } from "@lib/utils/graphqlFetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    getPublicClient,
    waitForTransactionReceipt,
    writeContract,
} from "@wagmi/core";
import type { Address } from "viem";
import { simulateContract } from "viem/actions";
import type { Config } from "wagmi";
import { useConfig } from "wagmi";

export const useUnlocks = (
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
            const query = `query Unlocks($tenderizer: String!, $user: String!) {
                unlocks(where: { tenderizer: $tenderizer, user: $user }) {
                    id
                    amount
                    timestamp
                    maturity
                    }`;
            const data = await graphqlFetch(SUBGRAPHS[chainId], query, {
                tenderizer,
                user,
            });
            return data.unlocks as Balance[];
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
    return useMutation({
        mutationFn: async () => {
            try {
                return await unlock(tenderizer, amount, chainId, wagmiConfig);
            } catch (err) {
                console.log(err)
            }
        },
    });
};

const unlock = async (
    tenderizer: Address,
    amount: bigint,
    chainId: number,
    wagmiConfig: Config
) => {
    const publicClient = getPublicClient(wagmiConfig, { chainId });
    if (!publicClient) return;
    try {
        const { request: unlock } = await simulateContract(publicClient, {
            address: tenderizer,
            abi: TenderizerAbi,
            functionName: "unlock",
            args: [amount],
        });

        const hash = await writeContract(wagmiConfig, unlock);

        await waitForTransactionReceipt(wagmiConfig, { hash, chainId });

        return hash;
    } catch (error) {
        console.log(error)
        throw error;
    }
};
