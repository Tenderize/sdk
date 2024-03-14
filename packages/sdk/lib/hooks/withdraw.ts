import { TenderizerAbi } from "@lib/abis";
import { getUnlockID } from "@lib/utils/global";
import { useMutation } from "@tanstack/react-query";
import {
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
        console.log(err);
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
  const signer = await getWalletClient(wagmiConfig);
  if (!signer) return;

  try {
    const { request: withdraw } = await simulateContract(signer, {
      address: tenderizer,
      abi: TenderizerAbi,
      functionName: "withdraw",
      args: [signer.account.address, getUnlockID(unlockID)],
    });

    const hash = await writeContract(wagmiConfig, withdraw);

    await waitForTransactionReceipt(wagmiConfig, { hash, chainId });

    return hash;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
