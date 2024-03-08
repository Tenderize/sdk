import { Button } from "@lib/components/Button";
import { OutputField } from "@lib/components/OutputField";
import { MaxBalanceButton } from "@lib/components/MaxBalanceButton";
import { TokenSelector } from "@lib/components/TokenSelector";
import { usePreviewDeposit, useSelectedToken } from "@lib/hooks";
import { Flex } from "@radix-ui/themes";
import { type FC, useState } from "react";
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
      <OutputField value={formatEther(previewDeposit ?? 0n)} disabled />
      <Button variant="solid">Stake</Button>
    </Flex>
  );
};
