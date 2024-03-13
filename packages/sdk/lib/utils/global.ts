import type { Hex } from "viem";

const maxBits = 96n;
const maxValue = 2n ** maxBits - 1n;
export const getUnlockID = (unlock: Hex) => {
  const id = BigInt(unlock);
  // Extract the address (first 20 bytes) and uint96 (next 12 bytes)
  id >> maxBits;
  return id & maxValue;
};
