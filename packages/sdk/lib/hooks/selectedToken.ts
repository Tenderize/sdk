import { TENDERIZERS, TOKENS, TokenSlugEnums } from "@lib/constants";
import type { Token } from "@lib/types";
import { type Address } from "viem";
import { create } from "zustand";

type Store = {
  selectedToken: TokenSlugEnums;
  setSelectedToken: (token: TokenSlugEnums) => void;
};

export const useTokenStore = create<Store>()((set) => ({
  selectedToken: TokenSlugEnums.MATIC,
  setSelectedToken: (token: TokenSlugEnums) => set({ selectedToken: token }),
}));

export type UseSelectedToken = () => { token: Token; tenderizer: Address };

export const useSelectedToken: UseSelectedToken = () =>
  useTokenStore((state) => ({
    token: TOKENS[state.selectedToken],
    tenderizer: TENDERIZERS[state.selectedToken],
  }));
