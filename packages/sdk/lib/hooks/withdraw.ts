import { TenderizerAbi } from "@lib/abis";
import { getUnlockID } from "@lib/utils/global";
import { useMutation } from "@tanstack/react-query";
import {
  getPublicClient,
  getWalletClient,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { type Address, type Hex } from "viem";
import { simulateContract } from "viem/actions";
import { useConfig, type Config } from "wagmi";

export const useWithdraw = (tenderizer: Address, chainId: number) => {
  const wagmiConfig = useConfig();
  return useMutation({
    mutationFn: async (unlockID: Hex) => {
      try {
        return await withdraw(unlockID, tenderizer, chainId, wagmiConfig);
      } catch (err) {
        console.log(err)
      }
    },
  });
};

const withdraw = async (
  unlockID: Hex,
  tenderizer: Address,
  chainId: number,
  wagmiConfig: Config
) => {
  const publicClient = getPublicClient(wagmiConfig, { chainId });
  const signer = await getWalletClient(wagmiConfig);
  if (!publicClient) return;

  try {
    const { request: withdraw } = await simulateContract(publicClient, {
      address: tenderizer,
      abi: TenderizerAbi,
      functionName: "withdraw",
      args: [signer.account.address, getUnlockID(unlockID)], // ? need to check if this is correct
    });

    const hash = await writeContract(wagmiConfig, withdraw);

    await waitForTransactionReceipt(wagmiConfig, { hash, chainId });

    return hash;
  } catch (error) {
    console.log(error)
    throw error;
  }
};
