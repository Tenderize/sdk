import type { Address, Hex } from "viem";

const maxBits = 96n;
const maxValue = 2n ** maxBits - 1n;
export const getUnlockID = (unlock: Hex) => {
  const id = BigInt(unlock);
  // Extract the address (first 20 bytes) and uint96 (next 12 bytes)
  id >> maxBits;
  return id & maxValue;
};

export const formatMaturity = (maturity: number) => {
  if (maturity >= 604800) {
    const weeks = Math.floor(maturity / 604800);
    return `~ ${weeks} ${weeks === 1 ? "week" : "weeks"}`;
  }
  if (maturity >= 86400) {
    const days = Math.floor(maturity / 86400);
    return `~ ${days} ${days === 1 ? "day" : "days"}`;
  }
  if (maturity >= 3600) {
    const hours = Math.floor(maturity / 3600);
    return `~ ${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
  if (maturity >= 60) {
    const minutes = Math.floor(maturity / 60);
    return `~ ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  }
  maturity = Math.floor(maturity);
  return `~ ${maturity} ${maturity === 1 ? "second" : "seconds"}`;
};

export const isMutationPending = (status: string) => {
  return status === "pending";
};

export const formatAddress = (address: Address): string => {
  if (address?.length < 10) {
    return address; // If the length is less than 10, return the original address
  }
  const start = address?.substring(0, 6);
  const end = address?.substring(address.length - 4);
  return `${start}....${end}`;
};
