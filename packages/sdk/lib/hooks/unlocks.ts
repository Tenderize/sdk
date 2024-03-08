import { graphqlFetch } from '@lib/utils/graphqlFetch'
import { useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'
import { SUBGRAPHS } from '@lib/constants'

export const useUnlocks = (tenderizer: Address, user: Address, chainId: number) => {
    const { data: unlocks, isLoading, error } = useQuery({
        queryKey: ['unlocks', tenderizer, user],
        queryFn: async () => {
            const query = `query Unlocks($tenderizer: String!, $user: String!) {
                unlocks(where: { tenderizer: $tenderizer, user: $user }) {
                    id
                    amount
                    timestamp
                    maturity
                    }`
            const data = await graphqlFetch(SUBGRAPHS[chainId], query, { tenderizer, user })
            return data.unlocks
        }
    })
    return { unlocks, isLoading, error }
}