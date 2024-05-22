import Grt from "@lib/assets/tokens/grt.png";
import Lpt from "@lib/assets/tokens/lpt.png";
import Matic from "@lib/assets/tokens/matic.png";
import {
  TokenNameEnums,
  TokenSlugEnums,
  TokenSymbolEnums,
} from "@lib/constants";
import type { Token, TokenAddresses } from "@lib/types";

export const maticToken: Token = {
  name: TokenNameEnums.MATIC,
  currency: TokenSymbolEnums.MATIC,
  address: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
  tenderswap: "0x422BEF50e75098c3337790627689fF1aAA06C057",
  adapter: "0xB2E9706A600395929b25E402C5B850E6025868E1",
  slug: TokenSlugEnums.MATIC,
  img: {
    token: Matic,
    tToken: Matic,
  },
  color: "#580DF5",
  validator: "validator",
  unlockPeriod: {
    value: "2-3",
    denomination: "D",
  },
  erc2612: false,
};

export const livepeerToken: Token = {
  name: TokenNameEnums.LIVEPEER,
  currency: TokenSymbolEnums.LIVEPEER,
  slug: TokenSlugEnums.LIVEPEER,
  img: {
    token: Lpt,
    tToken: Lpt,
  },
  color: "#57BE78",
  validator: "orchestrator",
  address: "0x289ba1701c2f088cf0faf8b3705246331cb8a839",
  tenderswap: "0x686962481543d543934903C3FE8bDe8c5dB9Bd97",
  unlockPeriod: {
    value: "6-7",
    denomination: "D",
  },
  erc2612: true,
  adapter: "0x954605F1bEc0FA1045e61E29F772c54BE2d413a8",
};

export const graphToken: Token = {
  name: TokenNameEnums.GRAPH,
  currency: TokenSymbolEnums.GRAPH,
  slug: TokenSlugEnums.GRAPH,
  img: {
    token: Grt,
    tToken: Grt,
  },
  color: "#707CE9",
  validator: "indexer",
  address: "0x9623063377ad1b27544c965ccd7342f7ea7e88c7",
  tenderswap: "0x7ee73bCa91f833C4E06BDC5F0e9f9aB7Ed9dB67d",
  unlockPeriod: {
    value: "26-52",
    denomination: "D",
  },
  erc2612: false,
  adapter: "0x1eDbBF4E0469786052E93FC9538237d534D6197f",
};

export const TOKENS = {
  matic: maticToken,
  livepeer: livepeerToken,
  graph: graphToken,
} as const;

export const TOKEN_ADDRESSES: TokenAddresses = {
  "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0": TokenSlugEnums.MATIC,
  "0x289ba1701c2f088cf0faf8b3705246331cb8a839": TokenSlugEnums.LIVEPEER,
  "0x9623063377ad1b27544c965ccd7342f7ea7e88c7": TokenSlugEnums.GRAPH,
};

export const TOKENS_WALLET_IMAGE = {
  [TokenSlugEnums.MATIC]: "/tokens/tmatic.png",
  [TokenSlugEnums.LIVEPEER]: "/tokens/tlpt.png",
  [TokenSlugEnums.GRAPH]: "/tokens/tgrt.png",
} as const;
