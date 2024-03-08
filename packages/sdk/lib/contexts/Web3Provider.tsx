import { http, createConfig, WagmiProvider, Config } from 'wagmi'
import { mainnet, arbitrum } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import type { FC, ReactNode } from 'react';
import type { Web3ConfigOptions } from '@lib/types';

interface CreateTenderizeConfig {
    (options: Web3ConfigOptions): Config;
}

export const createTenderizeConfig: CreateTenderizeConfig = (config) => {
    return createConfig(
        getDefaultConfig({
            // Your dApps chains
            chains: config.chains || [mainnet, arbitrum],
            transports: config.transports || {
                // RPC URL for each chain
                [mainnet.id]: http(
                    `https://eth-mainnet.g.alchemy.com/v2/${config.apiKey}`,
                ),
                [arbitrum.id]: http(
                    `https://arb-mainnet.g.alchemy.com/v2/${config.apiKey}`,
                ),
            },

            // Required API Keys
            walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string,

            // Required App Info
            appName: config.appName || "Tenderize SDK",

            // Optional App Info
            appDescription: config.appDescription || "Built using the Tenderize SDK",
            appUrl: config.appUrl || "https://tenderize.me", // your app's url
            appIcon: config.appIcon || "https://app.tenderize.me/wagyu.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
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