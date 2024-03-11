import { Button } from "@lib/components/Button";
import MaxBalanceButton from "@lib/components/MaxBalanceButton";
import { OutputField } from "@lib/components/OutputField";
import { useQuote, useSelectedToken } from "@lib/hooks";
import { Flex } from "@radix-ui/themes";
import { useState, type FC } from "react";
import { formatEther } from "viem";

export const Swap: FC = () => {
  const [amount, setAmount] = useState<bigint>(0n);
  const { token, tenderizer } = useSelectedToken();
  const { quote, isLoading, isError } = useQuote(
    token.slug,
    tenderizer,
    amount,
    token.chainId
  );
  isLoading;
  isError;
  return (
    <Flex direction="column" gap="2">
      <MaxBalanceButton
        tokenAddress={tenderizer}
        tokenSlug={token.slug}
        handleInputChange={(value: bigint) => {
          if (value && value != amount) setAmount(value);
        }}
      />
      <OutputField value={formatEther(quote.out ?? 0n)} disabled />
      <Button variant="solid">Swap</Button>
    </Flex>
  );
};
