import { ValidatorProfile } from '@/types';
import { useEffect, useState } from 'react';
import { type Address } from 'viem';

interface ProfileHookResult {
    profile: ValidatorProfile | null;
    loading: boolean;
    error: string | null;
}

import { getAddress, type Address } from 'viem';

import { VALIDATOR_PROFILES } from '@/constants/validators';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import type { GetEnsAvatarReturnType } from 'viem/ens';
import { normalize } from 'viem/ens';

export type FetchEnsAvatarArgs = {
    /** ENS name */
    name: string;
    /** Chain id to use for Public Client. */
    chainId?: number;
};

export type FetchEnsAvatarResult = GetEnsAvatarReturnType;

export const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(
        'https://eth-mainnet.g.alchemy.com/v2/trD7ShUu0k9JzVNt6HGZL-NKxWByZeYF'
    ), // TODO: make env var
});
export type FetchEnsNameArgs = {
    /** Address to lookup */
    address: Address;
    /** Chain id to use for Public Client */
    chainId?: number;
};

export type FetchEnsNameResult = string | null;

export async function fetchEnsName({
    address,
    chainId,
}: FetchEnsNameArgs): Promise<FetchEnsNameResult> {
    return await publicClient.getEnsName({
        address: getAddress(address),
    });
}

export async function fetchEnsAvatar({
    name,
    chainId,
}: FetchEnsAvatarArgs): Promise<FetchEnsAvatarResult> {
    const { normalize } = await import('viem/ens');
    const avatar = await publicClient.getEnsAvatar({ name: normalize(name) });
    return avatar;
}

export async function fetchAddressForENS(name: string): Promise<Address> {
    const ensAddress = await publicClient.getEnsAddress({
        name: normalize(name),
    });
    return ensAddress.toLowerCase() as Address;
}

export const getValidatorProfile = async (
    address: Address
): Promise<ValidatorProfile> => {
    if (VALIDATOR_PROFILES[address]) {
        return VALIDATOR_PROFILES[address];
    }
    const name = (await fetchEnsName({ address: getAddress(address) })) || '';
    const avatar = name ? await fetchEnsAvatar({ name }) : '';
    return {
        address: address,
        name,
        avatar: avatar || '',
    };
};


export const useEnsProfile = (address: Address): ProfileHookResult => {
    const [profile, setProfile] = useState<ValidatorProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userProfile = await getValidatorProfile(address);
                setProfile(userProfile);
            } catch (error) {
                setError('Error fetching profile');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [address]);

    return { profile, loading, error };
};
