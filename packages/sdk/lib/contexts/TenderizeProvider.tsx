import { useTenderizeConfigStore } from "@lib/config/store";
import type { TenderizeConfig } from "@lib/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { useEffect, type FC, type ReactNode } from "react";
import { WagmiProvider, type Config } from "wagmi";

const queryClient = new QueryClient();

export const Web3Provider: FC<{ config: Config; children: ReactNode }> = ({
  config,
  children,
}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children} </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export const TenderizeProvider: FC<{
  config: TenderizeConfig;
  children: ReactNode;
}> = ({ config, children }) => {
  // This provider wraps the Web3 provider and uses a zustand store to store the config.tenderizers
  const { setConfig } = useTenderizeConfigStore();
  useEffect(() => {
    setConfig(config);
  }, [config, setConfig]);

  return <Web3Provider config={config}>{children}</Web3Provider>;
};

export default TenderizeProvider;
