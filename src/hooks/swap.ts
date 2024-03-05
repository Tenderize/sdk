import { Address } from 'viem';
import TenderSwapAbi from '@/abis/TenderSwap';
import { TOKENS } from '@/constants/tokens';
import { useReadContract } from 'wagmi';
import { TokenSlugEnums } from '@/constants/enums';

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
    const { data, isLoading, isError } = useReadContract(
        {
            address: TOKENS[asset]?.tenderswap,
            functionName: 'quote',
            args: [tenderizer, amount],
            abi: TenderSwapAbi,
            chainId,
            query: {
                enabled: !!amount
            }
        }
    );

    return {
        quote: { out: data?.[0] ?? 0n, fee: data?.[1] ?? 0n },
        isLoading,
        isError,
    };
};