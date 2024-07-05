import { TOKENS, type TokenSlugEnums } from "@lib/constants";
import type {
  TenderizeChains,
  TenderizeConfig,
  TenderizersConfig,
  Token,
  TokenMetadata,
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
  tokenMetadata: Partial<Record<TokenSlugEnums, TokenMetadata>> | null;
  setConfig: (
    tenderizers: Pick<TenderizeConfig, "tenderizers" | "chains">
  ) => void;
  setActiveTabs: (tabs: TabEnum[]) => void;
  setTokens: (tokens: TokenSlugEnums[]) => void;
  setBranding?: (
    brandings: Partial<Record<TokenSlugEnums, TokenMetadata>>
  ) => void;
  updateBranding?: (
    brandings: Partial<Record<TokenSlugEnums, TokenMetadata>>
  ) => void;
};

export const useTenderizeConfigStore = create<Store>((set) => ({
  tenderizers: {},
  chains: {},
  activeTabs: [TabEnum.STAKE, TabEnum.UNSTAKE, TabEnum.SWAP],
  tokenMetadata: null,
  tokens: Object.keys(TOKENS) as TokenSlugEnums[],
  setConfig: (config: Pick<TenderizeConfig, "tenderizers" | "chains">) =>
    set({ tenderizers: config.tenderizers, chains: config.chains }),
  setActiveTabs: (tabs: TabEnum[]) => set({ activeTabs: tabs }),
  setTokens: (tokens: TokenSlugEnums[]) => set({ tokens }),
  setBranding: (
    tokenMetadata?: Partial<Record<TokenSlugEnums, TokenMetadata>>
  ) => set({ tokenMetadata }),
  updateBranding: (
    tokenMetadata?: Partial<Record<TokenSlugEnums, TokenMetadata>>
  ) =>
    set((state) => {
      return {
        tokenMetadata: {
          ...state.tokenMetadata,
          ...tokenMetadata,
        },
      };
    }),
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

export const useTokenMetadataByToken = (token: Token) => {
  return useTenderizeConfigStore((state) => {
    const { name, avatar } = state?.tokenMetadata?.[token.slug] ?? {};
    return { name, avatar };
  });
};
export const useTokenMetadata = () => {
  return useTenderizeConfigStore((state) => state.tokenMetadata);
};
