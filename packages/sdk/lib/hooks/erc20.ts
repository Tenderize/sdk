import { type Address, type Hash, erc20Abi } from 'viem';
import { useConfig, useReadContract, type Config } from 'wagmi';
import { simulateContract } from 'viem/actions';
import { getPublicClient, writeContract, waitForTransactionReceipt, getWalletClient } from '@wagmi/core'
import { type ERC2612Permit, signERC2612Permit } from '@lib/utils';
import { useMutation } from '@tanstack/react-query';
import { TOKENS, TOKEN_ADDRESSES, TokenSlugEnums } from '@lib/constants';

type UseERC20Balance = (
    token: Address,
    account: Address | undefined,
    chainId?: number,
) => { balance: bigint; isLoading: boolean; isError: boolean, refetch: any };

export const useERC20Balance: UseERC20Balance = (
    token,
    account,
    chainId
) => {
    const { data: balance, isLoading, isError, refetch } = useReadContract(account && {
        abi: erc20Abi,
        args: [account],
        address: token,
        functionName: 'balanceOf',
        chainId
    });
    return { balance: balance ?? 0n, isLoading, isError, refetch };
};

type UseERC20Allowance = (
    token: Address,
    account: Address,
    spender: Address,
    chainId?: number,
) => { allowance: bigint; isLoading: boolean; isError: boolean };

export const useERC20Allowance: UseERC20Allowance = (
    token,
    account,
    spender,
    chainId = 1
) => {
    const { data: allowance, isLoading, isError } = useReadContract({
        abi: erc20Abi,
        args: [account, spender],
        address: token,
        functionName: 'allowance',
        chainId,
        query: {
            enabled: !!account && !!spender,
        }
    });

    return { allowance: allowance ?? 0n, isLoading, isError };
};

type UseERC20TotalSupply = (
    token: Address,
    chainId?: number,
) => { totalSupply: bigint; isLoading: boolean; isError: boolean };

export const useERC20TotalSupply: UseERC20TotalSupply = (
    token,
    chainId = 1
) => {
    const { data: totalSupply, isLoading, isError } = useReadContract({
        abi: erc20Abi,
        address: token,
        functionName: 'totalSupply',
        chainId
    });

    return { totalSupply: totalSupply ?? 0n, isLoading, isError };
}

export const useERC20Approve = (
    token: Address,
    spender: Address,
    amount: bigint,
    chainId: number,) => {
    const wagmiConfig = useConfig()
    const tokenSlug = TOKEN_ADDRESSES[token] as TokenSlugEnums
    const hasPermit = TOKEN_ADDRESSES[token] ? TOKENS[tokenSlug].erc2612 : true
    return useMutation({
        mutationFn: async () => {
            return hasPermit ? await erc20Permit(token, spender, amount, wagmiConfig, chainId) : await erc20Approve(token, spender, amount, wagmiConfig, chainId)
        },
        onSuccess: (data: Hash | ERC2612Permit | undefined) => {
            return data;
        }
    })
}

const erc20Approve = async (asset: Address, spender: Address, amount: bigint, wagmiConfig: Config, chainId: number) => {
    const publicClient = getPublicClient(wagmiConfig, { chainId });
    if (!publicClient) return;
    const { request: approve } = await simulateContract(publicClient, {
        address: asset,
        abi: erc20Abi,
        functionName: 'approve',
        args: [spender, amount],
    });
    const hash = await writeContract(wagmiConfig, approve);
    await waitForTransactionReceipt(wagmiConfig, { hash, chainId })
    return hash
}

const erc20Permit = async (asset: Address, spender: Address, amount: bigint, wagmiConfig: Config, chainId: number) => {
    const publicClient = getPublicClient(wagmiConfig, { chainId });
    const signer = await getWalletClient(wagmiConfig)
    const permit = await signERC2612Permit(publicClient, asset, signer, spender, amount,)
    return permit;
}


