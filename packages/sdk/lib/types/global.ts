import type { Address } from "viem";

export type Unlock = {
  id: string;
  amount: string;
  maturity: number;
  redeemed: boolean;
  asset: Address;
};
