import { Button } from "@lib/components/Button";
import { OutputField } from "@lib/components/OutputField";
import { MaxBalanceButton } from "@lib/components/MaxBalanceButton";
import { TokenSelector } from "@lib/components/TokenSelector";
import { usePreviewDeposit, useSelectedToken, useERC20Approve, useDeposit } from "@lib/hooks";
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

  const { mutate: approve, data: approval } = useERC20Approve(token.address, tenderizer, amount, token.chainId);
  const { mutate: deposit } = useDeposit(tenderizer, amount, token.chainId);
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
      {!approval ? <Button onClick={() => approve()} variant="solid">Approve {token.currency}</Button>
        : <Button onClick={() => deposit()} variant="solid">Stake {token.currency}</Button>
      }
    </Flex>
  );
};
