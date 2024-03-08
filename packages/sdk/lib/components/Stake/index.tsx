import { Flex } from "@radix-ui/themes";
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
          if (value && value != amount)
            setAmount(value)
        }}
      />
      <InputNumber value={formatEther(previewDeposit ?? 0n)} disabled />
      <Button variant="solid">Stake</Button>
    </Flex>
  );
};
