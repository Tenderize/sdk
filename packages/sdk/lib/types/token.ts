import {
    TokenSymbolEnums,
    TokenNameEnums,
    TokenSlugEnums,
} from '@lib/constants/enums';
import type { Address } from 'viem';

export type Token = {
    name: (typeof TokenNameEnums)[keyof typeof TokenNameEnums];
    currency: (typeof TokenSymbolEnums)[keyof typeof TokenSymbolEnums];
    slug: (typeof TokenSlugEnums)[keyof typeof TokenSlugEnums];
    img: {
        token: any;
        tToken: any;
    };
    color: string;
    validator?: string; // TODO: make required
    address: Address; // TODO: make required
    network?: string; // TODO: make required
    tenderswap?: Address; // TODO: make required
    faucet?: Address; // Testnet only
    unlockPeriod?: {
        value: string;
        denomination: string;
    };
    erc2612: boolean;
    adapter: Address;
    tvl?: bigint | string;
    tvlInCurrency?: bigint | string;
    minAPY?: number | string;
    maxAPY?: number | string;
    tokenSymbol?: string;
    subTitle?: string;
    content?: string;
}

export type TokenAddresses = {
    [key: Address]: TokenSlugEnums;
};


export const COINGECKO_KEYS = {
    [TokenSlugEnums.LIVEPEER]: 'livepeer',
    [TokenSlugEnums.MATIC]: 'matic-network',
    [TokenSlugEnums.GRAPH]: 'the-graph',
} as const;