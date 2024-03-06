import { Flex } from "@radix-ui/themes";
import { ConnectKitButton } from "connectkit";
import MaxBalanceButton from "../components/MaxBalanceButton";
import { Button } from "../components/Button";
import { InputNumber } from "../components/InputNumber";
import { useState } from "react";
import { usePreviewDeposit } from "@/hooks/deposit";
import { useSelectedToken } from "@/hooks/selectedToken";
import { formatEther } from "viem";

export const Stake = () => {
  const [amount, setAmount] = useState<bigint>(0n);
  const { token, tenderizer } = useSelectedToken();
  const { previewDeposit, isLoading, isError } = usePreviewDeposit(tenderizer, amount, token.chainId);
  return (
    <Flex direction="column" gap="2">
      <MaxBalanceButton
        tokenAddress={token.address}
        handleInputChange={(value: bigint) => {
          setAmount(value)
          console.log(value);
        }}
      />
      <InputNumber value={formatEther(previewDeposit ?? 0n)} disabled />
      <ConnectKitButton /> {/* Todo: use wagmi config to change buttons */}
      <Button variant="solid">Stake</Button>
    </Flex>
  );
};
