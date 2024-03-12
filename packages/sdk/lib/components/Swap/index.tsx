import { Button } from "@lib/components/Button";
import MaxBalanceButton from "@lib/components/MaxBalanceButton";
import { OutputField } from "@lib/components/OutputField";
import { type FC, useState } from "react";
import { useQuote } from "@lib/hooks";
import { useSelectedToken } from "@lib/contexts";
import { formatEther } from "viem";
import { useTenderizer, useChainId } from "@lib/config/store";
import { Flex } from "@radix-ui/themes";

export const Swap: FC = () => {
  const [amount, setAmount] = useState<bigint>(0n);
  const token = useSelectedToken();
  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);
  const { quote, isLoading, isError } = useQuote(token.slug, tenderizer, amount, chainId);
  isLoading; isError;
  return (
    <Flex direction="column" gap="2">
      <MaxBalanceButton
        tokenAddress={tenderizer}
        handleInputChange={(value: bigint) => {
          if (value && value != amount) setAmount(value);
        }}
      />
      <OutputField value={formatEther(quote.out ?? 0n)} disabled />
      <Button variant="solid">Swap</Button>
    </Flex>
  );
};
