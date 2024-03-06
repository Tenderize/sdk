import { Address, erc20Abi } from 'viem';
import { useReadContract } from 'wagmi';

type UseERC20Balance = (
    token: Address,
    account: Address,
    chainId?: number,
) => { balance: bigint; isLoading: boolean; isError: boolean, refetch: any };

export const useERC20Balance: UseERC20Balance = (
    token,
    account,
    chainId = 1
) => {
    const { data: balance, isLoading, isError, refetch } = useReadContract({
        abi: erc20Abi,
        args: [account],
        address: token,
        functionName: 'balanceOf',
        chainId,
        query: {
            enabled: !!account,
        }
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