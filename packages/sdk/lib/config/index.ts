import type {
  TenderizeChains,
  TenderizeConfig,
  TenderizeConfigOptions,
} from "@lib/types";
import { getDefaultConfig } from "connectkit";
import { createConfig, http } from "wagmi";
import { arbitrum, mainnet, type Chain } from "wagmi/chains";

interface CreateTenderizeConfig {
  (options: TenderizeConfigOptions): TenderizeConfig;
}

export const createTenderizeConfig: CreateTenderizeConfig = (config) => {
  if (!Object.keys(config.tenderizers === Object.keys(config.chains))) {
    throw new Error(
      "Tenderizers and chains configuration must match supported tokens"
    );
  }

  function toChainArray(chains: TenderizeChains): [Chain, ...Chain[]] {
    const chainsArray = Object.values(chains);
    if (chainsArray.length > 0) {
      // This assertion is safe because we've checked that chains.length > 0
      return [...new Set(chainsArray)] as [Chain, ...Chain[]];
    } else {
      // Handle the case where the array is empty. Returning 'undefined' is one way to handle it.
      return [mainnet];
    }
  }

  const defaultChains = [mainnet, arbitrum];
  const wagmiChains: [Chain, ...Chain[]] = toChainArray(config.chains);

  return {
    tenderizers: config.tenderizers,
    chains: config.chains,
    web3: createConfig(
      getDefaultConfig({
        // Your dApps chains
        chains: (config.apiKey ? defaultChains : wagmiChains) as [
          Chain,
          ...Chain[]
        ],
        transports: config.transports || {
          // RPC URL for each chain
          [mainnet.id]: http(
            `https://eth-mainnet.g.alchemy.com/v2/${config.apiKey}`
          ),
          [arbitrum.id]: http(
            `https://arb-mainnet.g.alchemy.com/v2/${config.apiKey}`
          ),
        },

        // Required API Keys
        walletConnectProjectId: import.meta.env
          .VITE_WALLETCONNECT_PROJECT_ID as string,

        // Required App Info
        appName: config.appName || "Tenderize SDK",

        // Optional App Info
        appDescription:
          config.appDescription || "Built using the Tenderize SDK",
        appUrl: config.appUrl || "https://tenderize.me", // your app's url
        appIcon: config.appIcon || "https://app.tenderize.me/wagyu.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
      })
    ),
    ...(config?.tokens && { tokens: config.tokens }),
    ...(config?.tokenMetadata && { tokenMetadata: config.tokenMetadata }),
  };
};
