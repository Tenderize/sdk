import { Button } from "@lib/components/Button";
import { InputNumber } from "@lib/components/InputNumber";
import { MaxBalanceButton } from "@lib/components/MaxBalanceButton";
import { TokenSelector } from "@lib/components/TokenSelector";
import { usePreviewDeposit, useSelectedToken } from "@lib/hooks";
import { Flex } from "@radix-ui/themes";
import { FC, useState } from "react";
import { formatEther } from "viem";

export const Stake: FC = () => {
  const [amount, setAmount] = useState<bigint>(0n);
  const { token, tenderizer } = useSelectedToken();
  const { previewDeposit, isLoading, isError } = usePreviewDeposit(
    tenderizer,
    amount,
    token.chainId
  );
  isLoading;
  isError;
  return (
    <Flex direction="column" gap="2">
      <TokenSelector />
      <MaxBalanceButton
        tokenAddress={token.address}
        handleInputChange={(value: bigint) => {
          setAmount(value);
        }}
      />
      <InputNumber value={formatEther(previewDeposit ?? 0n)} disabled />
      <Button variant="solid">Stake</Button>
    </Flex>
  );
};
