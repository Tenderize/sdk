import { TOKENS, type TokenSlugEnums } from "@lib/constants";
import type {
    TenderizeChains,
    TenderizeConfig,
    TenderizersConfig,
} from "@lib/types";
import type { ValidatorProfile } from "@lib/types/tenderizer";
import type { Address } from "viem";
import { mainnet } from "viem/chains";
import { create } from "zustand";

type Store = {
    tenderizers: TenderizersConfig;
    chains: TenderizeChains;
    validator: ValidatorProfile | undefined;
    setConfig: (
        config: Omit<TenderizeConfig, "web3">
    ) => void;
};

export const useTenderizeConfigStore = create<Store>((set) => ({
    tenderizers: {},
    chains: {},
    validator: undefined,
    setConfig: (config: Omit<TenderizeConfig, "web3">) =>
        set({ tenderizers: config.tenderizers, chains: config.chains, validator: config.validator }),
}));

export const useTenderizers = (): TenderizersConfig => {
    return useTenderizeConfigStore((state) => state.tenderizers);
};

export const useTenderizer = (token: TokenSlugEnums) => {
    return useTenderizeConfigStore(
        (state) => state.tenderizers[token] ?? ("" as Address)
    );
};

export const useChain = (token: TokenSlugEnums) => {
    return useTenderizeConfigStore((state) => state.chains[token] ?? mainnet);
};

export const useChainId = (token: TokenSlugEnums) => {
    return useTenderizeConfigStore((state) => state.chains[token]?.id ?? 0);
};

export const useAvailableTokens = () => {
    return useTenderizeConfigStore(() => Object.keys(TOKENS));
};

export const useValidatorProfile = () => {
    return useTenderizeConfigStore((state) => state.validator);
}