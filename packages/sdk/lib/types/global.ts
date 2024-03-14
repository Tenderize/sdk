import type { Currency } from "@lib/constants";
import type { Address } from "viem";

export type Unlock = {
  id: string;
  amount: string;
  maturity: number;
  redeemed: boolean;
  asset: Address;
};
export type ValueOf<T> = T[keyof T];

export type CurrencyRates = {
  [K in Currency]?: number;
};
