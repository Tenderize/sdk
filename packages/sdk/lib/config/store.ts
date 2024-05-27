import { TOKENS, type TokenSlugEnums } from "@lib/constants";
import type {
  Branding,
  TenderizeChains,
  TenderizeConfig,
  TenderizersConfig,
  Token,
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
  branding: Partial<Record<TokenSlugEnums, Branding>> | null;
  setConfig: (
    tenderizers: Pick<TenderizeConfig, "tenderizers" | "chains">
  ) => void;
  setActiveTabs: (tabs: TabEnum[]) => void;
  setTokens: (tokens: TokenSlugEnums[]) => void;
  setBranding?: (brandings: Partial<Record<TokenSlugEnums, Branding>>) => void;
};

export const useTenderizeConfigStore = create<Store>((set) => ({
  tenderizers: {},
  chains: {},
  activeTabs: [TabEnum.STAKE, TabEnum.UNSTAKE, TabEnum.SWAP],
  branding: null,
  tokens: Object.keys(TOKENS) as TokenSlugEnums[],
  setConfig: (config: Pick<TenderizeConfig, "tenderizers" | "chains">) =>
    set({ tenderizers: config.tenderizers, chains: config.chains }),
  setActiveTabs: (tabs: TabEnum[]) => set({ activeTabs: tabs }),
  setTokens: (tokens: TokenSlugEnums[]) => set({ tokens }),
  setBranding: (branding?: Partial<Record<TokenSlugEnums, Branding>>) =>
    set({ branding: branding }),
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

export const useTokenBranding = (token: Token) => {
  return useTenderizeConfigStore((state) => {
    const { name, avatar } = state?.branding?.[token.slug] ?? {};
    return {
      name: name || `t${token.currency}`,
      avatar: avatar || token.img.tToken,
    };
  });
};
export const useBranding = () => {
  return useTenderizeConfigStore((state) => state.branding);
};
