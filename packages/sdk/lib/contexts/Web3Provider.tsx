import { http, createConfig, WagmiProvider, Config } from 'wagmi'
import { mainnet, arbitrum } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import type { FC, ReactNode } from 'react';
import type { ConfigOptions } from '@lib/types';

interface CreateTenderizeConfig {
    (options: ConfigOptions): Config;

}
export const createTenderizeConfig: CreateTenderizeConfig = ({
    apiKey,
}: ConfigOptions) => {
    return createConfig(
        getDefaultConfig({
            // Your dApps chains
            chains: [mainnet, arbitrum],
            transports: {
                // RPC URL for each chain
                [mainnet.id]: http(
                    `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
                ),
                [arbitrum.id]: http(
                    `https://arb-mainnet.g.alchemy.com/v2/${apiKey}`,
                ),
            },

            // Required API Keys
            walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string,

            // Required App Info
            appName: "Your App Name",

            // Optional App Info
            appDescription: "Your App Description",
            appUrl: "https://family.co", // your app's url
            appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
        }),
    );
}

const queryClient = new QueryClient();

export const Web3Provider: FC<{ config: Config, children: ReactNode }> = ({ config, children }) => {
    return (
        <WagmiProvider config={config} >
            <QueryClientProvider client={queryClient}>
                <ConnectKitProvider>{children} </ConnectKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};