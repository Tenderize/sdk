import { graphqlFetch } from '@lib/utils/graphqlFetch'
import { useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'
import { SUBGRAPHS } from '@lib/constants'

export const useTenderizerStats = (tenderizer: Address, chainId: number) => {
    const { data: stats, isLoading, error } = useQuery({
        queryKey: ['tenderizerStats', tenderizer],
        queryFn: async () => {
            const query = `query tenderizer(id: ID!) {
                tenderizer(id: $tenderizer) {
                    tvl
                    apy
                }`
            const data = await graphqlFetch(SUBGRAPHS[chainId], query, { tenderizer })
            return { tvl: data.tenderizer.tvl, apy: data.tenderizer.apy }
        }
    })
    return { stats: stats ?? { tvl: "0", apy: "0" }, isLoading, error }
}