import { TOKENS, type TokenSlugEnums } from "@lib/constants";
import type {
  TenderizeChains,
  TenderizeConfig,
  TenderizersConfig,
} from "@lib/types";
import { TabEnum } from "@lib/utils/iframe";
import type { Address } from "viem";
import { mainnet } from "viem/chains";
import { create } from "zustand";

type Store = {
  tenderizers: TenderizersConfig;
  chains: TenderizeChains;
  activeTabs: TabEnum[];
  tokens: TokenSlugEnums[];
  setConfig: (
    tenderizers: Pick<TenderizeConfig, "tenderizers" | "chains">
  ) => void;
  setActiveTabs: (tabs: TabEnum[]) => void;
  setTokens: (tokens: TokenSlugEnums[]) => void;
};

export const useTenderizeConfigStore = create<Store>((set) => ({
  tenderizers: {},
  chains: {},
  activeTabs: [TabEnum.STAKE, TabEnum.UNSTAKE, TabEnum.SWAP],
  tokens: Object.keys(TOKENS) as TokenSlugEnums[],
  setConfig: (config: Pick<TenderizeConfig, "tenderizers" | "chains">) =>
    set({ tenderizers: config.tenderizers, chains: config.chains }),
  setActiveTabs: (tabs: TabEnum[]) => set({ activeTabs: tabs }),
  setTokens: (tokens: TokenSlugEnums[]) => set({ tokens }),
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
