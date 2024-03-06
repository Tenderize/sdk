import { create } from 'zustand';
import { TokenSlugEnums } from '@/constants/enums';
import { TENDERIZERS, TOKENS } from '@/constants/tokens';
import type { Token } from '@/types';
import { Address } from 'viem';

type Store = {
    selectedToken: TokenSlugEnums;
}

export const useTokenStore = create<Store>()((set) => ({
    selectedToken: TokenSlugEnums.MATIC,
    setSelectedToken: (token: TokenSlugEnums) => set({ selectedToken: token }),
}));


export type UseSelectedToken = () => { token: Token, tenderizer: Address };

export const useSelectedToken: UseSelectedToken = () => useTokenStore((state) => ({
    token: TOKENS[state.selectedToken],
    tenderizer: TENDERIZERS[state.selectedToken],
}));