import { TokenSlugEnums } from "@lib/constants";
import type { Address, Chain } from "viem";
import type { Config, CreateConfigParameters } from "wagmi";

// Assuming CreateConfigParameters already includes optional "chains" and "transports",
// we make a version that requires these properties to be non-nullable.
type ConfigWithChainsAndTransports = CreateConfigParameters & {
  chains: NonNullable<CreateConfigParameters["chains"]>;
  transports: NonNullable<CreateConfigParameters["transports"]>;
};

// Configuration when apiKey is provided, making "chains" and "transports" explicitly optional
type ConfigWithApiKey = Omit<
  CreateConfigParameters,
  "chains" | "transports"
> & {
  apiKey: string;
  chains?: never;
  transports?: never;
};

export type TenderizeConfig = {
  tenderizers: TenderizersConfig;
  chains: TenderizeChains;
  web3: Config;
  tokens?: TokenSlugEnums[];
};

export type TenderizersConfig = { [token in TokenSlugEnums]?: Address };
export type TenderizeChains = { [token in TokenSlugEnums]?: Chain };

// Define the conditional ConfigOptions type
export type Web3ConfigOptions = {
  appName?: string;
  appDescription?: string;
  appUrl?: string;
  appIcon?: string;
} & (ConfigWithApiKey | (ConfigWithChainsAndTransports & { apiKey?: never }));

export type TenderizeConfigOptions = {
  tenderizers: TenderizersConfig;
  chains: TenderizeChains;
  tokens?: TokenSlugEnums[];
} & Omit<Web3ConfigOptions, "chains">;
