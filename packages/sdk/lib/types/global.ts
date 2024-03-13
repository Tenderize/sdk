import type { Address } from "viem";

export type Balance = {
  id: string;
  amount: string;
  maturity: number;
  redeemed: boolean;
  tenderizer: Tenderizer;
  //Todo: add more types as needed
};
export type Tenderizer = {
  id: string;
  asset: {
    id: Address;
  };
  name: string;
  symbol: string;
  validator: Address;
};
