import type { CreateConfigParameters } from "wagmi";

// Assuming CreateConfigParameters already includes optional "chains" and "transports",
// we make a version that requires these properties to be non-nullable.
type ConfigWithChainsAndTransports = CreateConfigParameters & {
    chains: NonNullable<CreateConfigParameters['chains']>;
    transports: NonNullable<CreateConfigParameters['transports']>;
};

// Configuration when apiKey is provided, making "chains" and "transports" explicitly optional
type ConfigWithApiKey = Omit<CreateConfigParameters, 'chains' | 'transports'> & {
    apiKey: string;
    chains?: never;
    transports?: never;
};

// Define the conditional ConfigOptions type
export type Web3ConfigOptions = {
    appName?: string;
    appDescription?: string;
    appUrl?: string;
    appIcon?: string;
} & (ConfigWithApiKey | (ConfigWithChainsAndTransports & { apiKey?: never }));
