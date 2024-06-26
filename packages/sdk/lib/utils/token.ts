import { TOKENS, TokenSlugEnums } from "@lib/constants";
import { type Address } from "viem";

export const getTokenAddress = (asset: TokenSlugEnums): Address =>
  TOKENS[asset].address as Address;

export const hasPermit = (asset: TokenSlugEnums): boolean =>
  TOKENS[asset].erc2612;

export const getDefaultToken = (availableTokens: TokenSlugEnums[]) => {
  // Check if MATIC is in the array, if so, return MATIC
  if (availableTokens.includes(TokenSlugEnums.MATIC)) {
    return TokenSlugEnums.MATIC;
  }
  // Otherwise, return the first token in the array
  return availableTokens[0];
};
