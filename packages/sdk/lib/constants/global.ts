import arbLogo from "@lib/assets/chain/arbitrum-arb-logo.svg";
import ethLogo from "@lib/assets/chain/ethereum-eth-logo.svg";
import { arbitrum, mainnet } from "viem/chains";
import { Currency, TokenSlugEnums } from ".";
export const MAX_INT =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

export const EIP_712_DOMAIN = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
];

export const NAME_FN = "0x06fdde03";
export const NONCES_FN = "0x7ecebe00";
export const ERC2612_DATA_PERMIT = [
  { name: "owner", type: "address" },
  { name: "spender", type: "address" },
  { name: "value", type: "uint256" },
  { name: "nonce", type: "uint256" },
  { name: "deadline", type: "uint256" },
];

export const SUBGRAPHS: Record<number, string> = {
  [mainnet.id]:
    "https://api.studio.thegraph.com/query/45970/tenderize-v2-mainnet/version/latest",
  [arbitrum.id]:
    "https://api.studio.thegraph.com/query/45970/tenderize-v2-arbitrum/version/latest",
};

export const CHAINS: Record<number, any> = {
  [mainnet.id]: {
    ...mainnet,
    iconUrl: ethLogo,
    explorerUrl: "https://etherscan.io/",
  },
  [arbitrum.id]: {
    ...arbitrum,
    iconUrl: arbLogo,
    explorerUrl: "https://arbiscan.io/",
  },
};

export const COINGECKO_KEYS = {
  [TokenSlugEnums.LIVEPEER]: "livepeer",
  [TokenSlugEnums.MATIC]: "matic-network",
  [TokenSlugEnums.GRAPH]: "the-graph",
};

export const DEFAULT_CURRENCY = {
  code: Currency.USD,
  symbol: "$",
};

export default {};
