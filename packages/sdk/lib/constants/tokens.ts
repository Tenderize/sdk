import {
    TokenSymbolEnums,
    TokenNameEnums,
    TokenSlugEnums,
} from '@lib/constants';
import type { Token, TokenAddresses } from '@lib/types';
import { mainnet, arbitrum } from 'viem/chains';
import Grt from '@lib/assets/tokens/grt.svg';
import Lpt from '@lib/assets/tokens/lpt.svg';
import Matic from '@lib/assets/tokens/matic.svg';
import TGrt from '@lib/assets/tokens/tgrt.svg';
import TLpt from '@lib/assets/tokens/tlpt.svg';
import TMatic from '@lib/assets/tokens/tmatic.svg';
import type { Address } from 'viem';

export const maticToken: Token = {
    name: TokenNameEnums.MATIC,
    currency: TokenSymbolEnums.MATIC,
    address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    tenderswap: '0x90a2738490fe0ec19263d23dd8cbacd3409063f6',
    adapter: '0xB2E9706A600395929b25E402C5B850E6025868E1',
    slug: TokenSlugEnums.MATIC,
    img: {
        token: Matic,
        tToken: TMatic,
    },
    color: '#580DF5',
    validator: 'validator',
    unlockPeriod: {
        value: '2-3',
        denomination: 'D',
    },
    chainId: mainnet.id,
    erc2612: false,
};

export const livepeerToken: Token = {
    name: TokenNameEnums.LIVEPEER,
    currency: TokenSymbolEnums.LIVEPEER,
    slug: TokenSlugEnums.LIVEPEER,
    img: {
        token: Lpt,
        tToken: TLpt,
    },
    color: '#57BE78',
    validator: 'orchestrator',
    address: '0x289ba1701c2f088cf0faf8b3705246331cb8a839',
    tenderswap: '0x739942a5e255186497a1880b63364b9f03ec89bc',
    unlockPeriod: {
        value: '6-7',
        denomination: 'D',
    },
    chainId: arbitrum.id,
    erc2612: true,
    adapter: '0x954605F1bEc0FA1045e61E29F772c54BE2d413a8',
};

export const graphToken: Token = {
    name: TokenNameEnums.GRAPH,
    currency: TokenSymbolEnums.GRAPH,
    slug: TokenSlugEnums.GRAPH,
    img: {
        token: Grt,
        tToken: TGrt,
    },
    color: '#707CE9',
    validator: 'indexer',
    address: '0x9623063377ad1b27544c965ccd7342f7ea7e88c7',
    tenderswap: '0x2c7b29b0d07276ba2df4abe02e9a38b5693af9c6',
    unlockPeriod: {
        value: '26-52',
        denomination: 'D',
    },
    chainId: arbitrum.id,
    erc2612: false,
    adapter: '0x1eDbBF4E0469786052E93FC9538237d534D6197f',
};

export const TOKENS = {
    matic: maticToken,
    livepeer: livepeerToken,
    graph: graphToken,
} as const;

export const TOKEN_ADDRESSES: TokenAddresses = {
    '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0': TokenSlugEnums.MATIC,
    '0x289ba1701c2f088cf0faf8b3705246331cb8a839': TokenSlugEnums.LIVEPEER,
    '0x9623063377ad1b27544c965ccd7342f7ea7e88c7': TokenSlugEnums.GRAPH,
};

export const TOKENS_WALLET_IMAGE = {
    [TokenSlugEnums.MATIC]: '/tokens/tmatic.png',
    [TokenSlugEnums.LIVEPEER]: '/tokens/tlpt.png',
    [TokenSlugEnums.GRAPH]: '/tokens/tgrt.png',
} as const;

// TODO: should be provided as config
export const TENDERIZERS: Record<TokenSlugEnums, Address> = {
    [TokenSlugEnums.MATIC]: '0x43ef285f5e27d8ca978a7e577f4ddf52147eb77b',
    [TokenSlugEnums.LIVEPEER]: '0x43ef285f5e27d8ca978a7e577f4ddf52147eb77b',
    [TokenSlugEnums.GRAPH]: '0x43ef285f5e27d8ca978a7e577f4ddf52147eb77b',
}