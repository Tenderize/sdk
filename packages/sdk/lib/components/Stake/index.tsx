import { Flex } from "@radix-ui/themes";
import { ConnectKitButton } from "connectkit";
import MaxBalanceButton from "@lib/components/MaxBalanceButton";
import { Button } from "@lib/components/Button";
import { InputNumber } from "@lib/components/InputNumber";
import { FC, useState } from "react";
import { usePreviewDeposit, useSelectedToken } from "@lib/hooks";
import { formatEther } from "viem";

export const Stake: FC = () => {
  const [amount, setAmount] = useState<bigint>(0n);
  const { token, tenderizer } = useSelectedToken();
  const { previewDeposit, isLoading, isError } = usePreviewDeposit(tenderizer, amount, token.chainId);
  isLoading; isError;
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
