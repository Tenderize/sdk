import TenderizerAbi from '@/abis/Tenderizer';
import { TokenSlugEnums } from '@/constants/enums';
import { TOKENS } from '@/constants/tokens';
import { ERC2612Permit } from '@/utils/erc2612';
import { useMutation } from '@tanstack/react-query';
import { Interface } from 'ethers/lib/utils';
import { Address, Hex, parseEther } from 'viem';
import { Config, useConfig, useReadContract, useWalletClient } from 'wagmi';
import { getPublicClient, getWalletClient, writeContract, waitForTransactionReceipt } from '@wagmi/core'
import { simulateContract } from 'viem/actions';

export type UsePreviewDeposit = (
    tenderizer: Address,
    amount: bigint,
    chainId?: number,
) => { previewDeposit: bigint; isLoading: boolean; isError: boolean, chainId: number };

export const usePreviewDeposit = (
    tenderizer: Address,
    amount: bigint,
    chainId: number
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
        chainId,
    });

    return { previewDeposit, isLoading, isError };
};

export const useDeposit = (
    asset: TokenSlugEnums,
    tenderizer: Address,
    amount: bigint,
    chainId: number,
    permit?: ERC2612Permit
) => {
    const signer = useWalletClient()
    const token = TOKENS[asset]
    const wagmiConfig = useConfig()
    return useMutation({
        mutationFn: async () => {
            return permit ? depositWithPermit(token.address, tenderizer, amount, permit, chainId, wagmiConfig) : depositWithApprove(tenderizer, amount, chainId, wagmiConfig)
        }
    })
}

const depositWithPermit = async (
    asset: Address,
    tenderizer: Address,
    amount: bigint,
    permit: ERC2612Permit,
    chainId: number,
    wagmiConfig: Config
) => {
    const ITenderizer = new Interface(TenderizerAbi);
    const publicClient = getPublicClient(wagmiConfig, { chainId });
    const signer = await getWalletClient(wagmiConfig)

    if (!publicClient) return;

    try {
        const { request } = await simulateContract(publicClient, {
            address: tenderizer,
            abi: TenderizerAbi,
            functionName: 'multicall',
            args: [
                [
                    ITenderizer.encodeFunctionData('selfPermit', [
                        asset,
                        permit.value,
                        permit.deadline,
                        permit.v,
                        permit.r,
                        permit.s,
                    ]) as Hex,
                    ITenderizer.encodeFunctionData('deposit', [
                        signer.account.address,
                        amount,
                    ]) as Hex,
                ],
            ],
        });

        const hash = await writeContract(wagmiConfig, request);

        return hash;
    } catch (err) {
        throw err;
    }
};

const depositWithApprove = async (
    tenderizer: Address,
    amount: bigint,
    chainId: number,
    wagmiConfig: Config
) => {
    const publicClient = getPublicClient(wagmiConfig, { chainId });
    const signer = await getWalletClient(wagmiConfig)
    if (!publicClient) return;

    try {
        const { request: deposit } = await simulateContract(publicClient, {
            address: tenderizer,
            abi: TenderizerAbi,
            functionName: 'deposit',
            args: [signer.account.address, parseEther(amount.toString())],
        });

        const hash = await writeContract(wagmiConfig, deposit);

        await waitForTransactionReceipt(wagmiConfig, { hash, chainId })

        return hash;
    } catch (error) {
        throw error;
    }
};

