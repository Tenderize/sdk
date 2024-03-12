import type { Address } from "viem";

export const formatAddress = (address: Address): string => {
  if (address?.length < 10) {
    return address; // If the length is less than 10, return the original address
  }
  const start = address?.substring(0, 5);
  const end = address?.substring(address.length - 4);
  return `${start}...${end}`;
};
