import type { TokenSlugEnums } from "@lib/constants";
import type { TenderizersConfig, TenderizeChains, TenderizeConfig } from "@lib/types";
import type { Address } from "viem";
import { mainnet } from "viem/chains";
import { create } from "zustand";

type Store = {
    tenderizers: TenderizersConfig;
    chains: TenderizeChains
    setConfig: (tenderizers: Pick<TenderizeConfig, "tenderizers" | "chains">) => void;
};

export const useTenderizeConfigStore = create<Store>((set) => ({
    tenderizers: {},
    chains: {},
    setConfig: (config: Pick<TenderizeConfig, "tenderizers" | "chains">) => set({ tenderizers: config.tenderizers, chains: config.chains }),
}));

export const useTenderizers = (): TenderizersConfig => {
    return useTenderizeConfigStore((state) => state.tenderizers);
}

export const useTenderizer = (token: TokenSlugEnums) => {
    return useTenderizeConfigStore((state) => state.tenderizers[token] ?? "" as Address);
}

export const useChain = (token: TokenSlugEnums) => {
    return useTenderizeConfigStore((state) => state.chains[token] ?? mainnet);
}

export const useChainId = (token: TokenSlugEnums) => {
    return useTenderizeConfigStore((state) => state.chains[token]?.id ?? 0);
}

export const useAvailableTokens = () => {
    return useTenderizeConfigStore(state => Object.keys(state.chains))
}

export const { setConfig } = useTenderizeConfigStore();