import TenderizerAbi from '@/abis/Tenderizer';
import { TokenSlugEnums } from '@/constants/enums';
import { getChainId } from '@/utils';

import { utils } from 'ethers';
import { Address, WalletClient, parseEther, erc20Abi } from 'viem';
import { useReadContract } from 'wagmi';
const { Interface } = utils;


export type UsePreviewDeposit = (
    asset: TokenSlugEnums,
    tenderizer: Address,
    amount: bigint
) => { previewDeposit: bigint; isLoading: boolean; isError: boolean };

export const usePreviewDeposit = (
    asset: TokenSlugEnums,
    tenderizer: Address,
    amount: bigint
) => {
    const {
        data: previewDeposit,
        isLoading,
        isError,
    } = useReadContract({
        address: tenderizer,
        functionName: 'previewDeposit',
        args: [amount],
        abi: TenderizerAbi,
        chainId: getChainId(asset),
    });

    return { previewDeposit, isLoading, isError };
};
