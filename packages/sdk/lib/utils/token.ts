import { TokenSlugEnums } from "@lib/constants";
import { TOKENS } from "@lib/constants";
import { type Address } from "viem";

export const getChainId = (asset: TokenSlugEnums): number =>
    TOKENS[asset]?.chainId ?? 0;

export const getTokenAddress = (asset: TokenSlugEnums): Address =>
    TOKENS[asset].address as Address;

export const hasPermit = (asset: TokenSlugEnums): boolean =>
    TOKENS[asset].erc2612;
