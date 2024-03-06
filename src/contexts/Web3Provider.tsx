import { http, createConfig, WagmiProvider } from 'wagmi'
import { mainnet, arbitrum } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { FC, ReactNode } from 'react';

const config = createConfig(
    getDefaultConfig({
        // Your dApps chains
        chains: [mainnet],
        transports: {
            // RPC URL for each chain
            [mainnet.id]: http(
                `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_ID}`,
            ),
            [arbitrum.id]: http(
                `https://arb-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_ID}`,
            ),
        },

        // Required API Keys
        walletConnectProjectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID as string,

        // Required App Info
        appName: "Your App Name",

        // Optional App Info
        appDescription: "Your App Description",
        appUrl: "https://family.co", // your app's url
        appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
);

const queryClient = new QueryClient();

export const Web3Provider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <WagmiProvider config={config} >
            <QueryClientProvider client={queryClient}>
                <ConnectKitProvider>{children} </ConnectKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};