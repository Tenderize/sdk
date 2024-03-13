import { TOKENS, TokenSlugEnums } from "@lib/constants";
import { AdapterAbi } from "@lib/abis";
import { type Config, useConfig } from "wagmi";
import { getPublicClient } from "@wagmi/core"
import { useChainId } from "@lib/config/store";
import { useQuery } from "@tanstack/react-query";

export const useAdapterTime = (asset: TokenSlugEnums) => {
    const wagmiConfig = useConfig();
    const chainId = useChainId(asset);

    const { data: time, isLoading, error } = useQuery({
        queryKey: ['adapterTime', asset],
        queryFn: () => getAdapterTime(asset, wagmiConfig, chainId),
    })

    return { time, isLoading, error }
}

const getAdapterTime = async (asset: TokenSlugEnums, wagmiConfig: Config, chainId: number): Promise<number> => {
    const publicClient = getPublicClient(wagmiConfig, { chainId });
    if (!publicClient) return 0;

    try {
        const time = await publicClient.readContract({
            abi: AdapterAbi,
            address: TOKENS[asset].adapter,
            functionName: 'currentTime'
        })

        return Number(time.toString())
    } catch (error) {
        console.log(error)
        throw error;
    }
}