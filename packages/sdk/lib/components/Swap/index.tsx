import { Flex } from "@radix-ui/themes";
import MaxBalanceButton from "@lib/components/MaxBalanceButton";
import { Button } from "@lib/components/Button";
import { InputNumber } from "@lib/components/InputNumber";
import { FC, useState } from "react";
import { useSelectedToken, useQuote } from "@lib/hooks";
import { formatEther } from "viem";

export const Swap: FC = () => {
  const [amount, setAmount] = useState<bigint>(0n);
  const { token, tenderizer } = useSelectedToken();
  const { quote, isLoading, isError } = useQuote(token.slug, tenderizer, amount, token.chainId);
  isLoading; isError;
  return (
    <Flex direction="column" gap="2">
      <MaxBalanceButton
        tokenAddress={tenderizer}
        handleInputChange={(value: bigint) => {
          if (value && value != amount)
            setAmount(value)
        }}
      />
      <InputNumber value={formatEther(quote.out ?? 0n)} disabled />
      <Button variant="solid">Swap</Button>
    </Flex>
  );
};
