import { create } from 'zustand';
import { TokenSlugEnums } from '@/constants/enums';
import { TOKENS } from '@/constants/tokens';
import type { Token } from '@/types';

type Store = {
    selectedToken: TokenSlugEnums;
}

export const useTokenStore = create<Store>()((set) => ({
    selectedToken: TokenSlugEnums.LIVEPEER,
    setSelectedToken: (token: TokenSlugEnums) => set({ selectedToken: token }),
}));


export type UseSelectedToken = () => Token;

export const useSelectedToken: UseSelectedToken = () => useTokenStore((state) => TOKENS[state.selectedToken]);