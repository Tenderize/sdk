import { TOKENS, TokenSlugEnums } from "@lib/constants";
import type { Token } from "@lib/types";
import { create } from "zustand";

type Store = {
  selectedToken: TokenSlugEnums;
  setSelectedToken: (token: TokenSlugEnums) => void;
};

export const useSelectedTokenStore = create<Store>()((set) => ({
  selectedToken: TokenSlugEnums.MATIC,
  setSelectedToken: (token: TokenSlugEnums) => set({ selectedToken: token }),
}));

export type UseSelectedToken = () => Token;

export const useSelectedToken: UseSelectedToken = () =>
  useSelectedTokenStore((state) => TOKENS[state.selectedToken]);
