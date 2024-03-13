import { TenderizerAbi } from "@lib/abis";
import { SUBGRAPHS } from "@lib/constants";
import type { Balance } from "@lib/types/global";
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

// Todo: remove mock data, when everything is up and running
const mockData = [
    {
        amount: "1.664180612061713899",
        id: "0x4003e23be46f3bf2b50c3c7f8b13aaecdc71ea72000000000000000000000003",
        maturity: 19583861,
        redeemed: false,
        tenderizer: {
            asset: {
                id: "0x9623063377ad1b27544c965ccd7342f7ea7e88c7",
            },
            id: "0x4003e23be46f3bf2b50c3c7f8b13aaecdc71ea72",
            name: "tender GRT-0x38f412c8d6346a17a53ff9ceecd2e01acecd27c0",
            symbol: "tGRT-0x38f412c8d6346a17a53ff9ceecd2e01acecd27c0",
            validator: "0x38f412c8d6346a17a53ff9ceecd2e01acecd27c0",
        },
    },
    {
        amount: "1.189236738653635568",
        id: "0x4003e23be46f3bf2b50c3c7f8b13aaecdc71ea72000000000000000000000004",
        maturity: 19583,
        redeemed: false,
        tenderizer: {
            asset: {
                id: "0x289ba1701c2f088cf0faf8b3705246331cb8a839",
            },
            id: "0x4003e23be46f3bf2b50c3c7f8b13aaecdc71ea72",
            name: "tender GRT-0x38f412c8d6346a17a53ff9ceecd2e01acecd27c0",
            symbol: "tGRT-0x38f412c8d6346a17a53ff9ceecd2e01acecd27c0",
            validator: "0x38f412c8d6346a17a53ff9ceecd2e01acecd27c0",
        },
    },
    {
        amount: "1.8107632998613464",
        id: "0x4003e23be46f3bf2b50c3c7f8b13aaecdc71ea72000000000000000000000005",
        maturity: 0,
        redeemed: false,
        tenderizer: {
            asset: {
                id: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
            },
            id: "0x4003e23be46f3bf2b50c3c7f8b13aaecdc71ea72",
            name: "tender GRT-0x38f412c8d6346a17a53ff9ceecd2e01acecd27c0",
            symbol: "tGRT-0x38f412c8d6346a17a53ff9ceecd2e01acecd27c0",
            validator: "0x38f412c8d6346a17a53ff9ceecd2e01acecd27c0",
        },
    },
];

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
            //Todo: Remove mock data
            if (mockData.length > 0) {
                // Return mock data
                return mockData;
            }
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
                console.log(err);
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
    const signer = await getWalletClient(wagmiConfig)
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
