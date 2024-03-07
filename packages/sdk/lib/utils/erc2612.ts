import {
    EIP_712_DOMAIN,
    ERC2612_DATA_PERMIT,
    MAX_INT,
    NAME_FN,
    NONCES_FN,
} from '@lib/constants';
import { TOKENS, TokenSlugEnums } from '@lib/constants';
import type { Address, WalletClient } from 'viem';
import { decodeAbiParameters } from 'viem';
import { type GetPublicClientReturnType } from '@wagmi/core'

export type ERC2612Permit = ERC2612PermitMessage & RSV;

interface ERC2612PermitMessage {
    owner: Address;
    spender: Address;
    value: number | string;
    nonce: number | string;
    deadline: number | string;
}

export interface Domain {
    name?: string;
    version: string;
    chainId: number;
    verifyingContract: Address;
    salt?: string;
}

interface RSV {
    r: string;
    s: string;
    v: number;
}

const getSalt = (token: Address) => {
    if (token === TOKENS[TokenSlugEnums.GRAPH].address) {
        return '0x51f3d585afe6dfeb2af01bba0889a36c1db03beec88c6a4d0c53817069026afa'
    }
}

export const signERC2612Permit = async (
    provider: GetPublicClientReturnType,
    token: Address | Domain,
    signer: WalletClient,
    spender: Address,
    value: bigint | string | number = MAX_INT,
    deadline?: number,
    nonce?: number
): Promise<ERC2612Permit> => {
    const tokenAddress =
        (token as Domain).verifyingContract || (token as Address);
    const owner: Address = signer.account?.address ?? '0x';

    try {
        const message: ERC2612PermitMessage = {
            owner,
            spender,
            value: value.toString(),
            nonce:
                nonce === undefined
                    ? await getNonce(provider, tokenAddress, owner)
                    : nonce,
            deadline: deadline || MAX_INT,
        };

        const domain = await getDomain(provider, token);
        const typedData = createTypedERC2612Data(message, domain);
        const sig = await signTypedData(signer, owner, typedData);

        return { ...sig, ...message };
    } catch (error) {
        throw error;
    }
};

const getDomain = async (
    provider: GetPublicClientReturnType,
    token: Address | Domain
): Promise<Domain> => {
    const tokenAddress =
        (token as Domain).verifyingContract || (token as Address);
    const salt = (token as Domain).salt || getSalt(tokenAddress.toLowerCase() as Address);

    try {
        const [name, chainId] = await Promise.all([
            getTokenName(provider, tokenAddress),
            provider?.getChainId(),
        ]);

        const domain: Domain = {
            name,
            version: '1',
            chainId: chainId ?? 1,
            verifyingContract: tokenAddress,
        };
        if (salt) domain.salt = salt;
        return domain;
    } catch (error) {
        throw error;
    }
};

const createTypedERC2612Data = (
    message: ERC2612PermitMessage,
    domain: Domain
) => {
    const typedData = {
        types: {
            EIP712Domain: EIP_712_DOMAIN,
            Permit: ERC2612_DATA_PERMIT,
        },
        primaryType: 'Permit',
        domain,
        message,
    };

    return typedData;
};

const signTypedData = async (
    client: WalletClient,
    account: Address,
    typedData: any
): Promise<RSV> => {
    try {
        return splitSignatureToRSV(
            await client.signTypedData({
                account,
                primaryType: typedData.primaryType,
                domain: typedData.domain,
                types: typedData.types,
                message: typedData.message,
            })
        );
    } catch (error) {
        throw error;
    }
};

const splitSignatureToRSV = (signature: string): RSV => {
    const r = '0x' + signature.substring(2).substring(0, 64);
    const s = '0x' + signature.substring(2).substring(64, 128);
    const v = parseInt(signature.substring(2).substring(128, 130), 16);
    return { r, s, v: v === 0 || v === 1 ? v + 27 : v };
};

const zeros = (numZeros: number) => ''.padEnd(numZeros, '0');

const getTokenName = async (provider: GetPublicClientReturnType, address: Address) => {
    try {
        const res = (await provider?.call({ to: address, data: NAME_FN }))?.data;
        return decodeAbiParameters([{ type: 'string', name: 'name' }], res ?? "0x")[0];
    } catch (error) {
        throw error;
    }
};

const getNonce = async (
    provider: GetPublicClientReturnType,
    token: Address,
    owner: Address
): Promise<number> => {
    try {
        const res = await provider?.call({
            account: owner,
            to: token,
            data: `${NONCES_FN}${zeros(24)}${owner.substr(2)}`,
        });
        const nonce = parseInt(res?.data ?? "0");
        return nonce;
    } catch (error) {
        throw error;
    }
};
