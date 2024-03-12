import { Button } from "@lib/components/Button";
import MaxBalanceButton from "@lib/components/MaxBalanceButton";
import { OutputField } from "@lib/components/OutputField";
import { useChainId, useTenderizer } from "@lib/config/store";
import { useSelectedToken } from "@lib/contexts";
import { useQuote } from "@lib/hooks";
import { Flex } from "@radix-ui/themes";
import { useState, type FC } from "react";
import { formatEther, parseEther } from "viem";

export const Swap: FC = () => {
  const [amount, setAmount] = useState<string>("0");
  const token = useSelectedToken();
  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);
  const { quote, isLoading, isError } = useQuote(
    token.slug,
    tenderizer,
    parseEther(amount),
    chainId
  );
  isLoading;
  isError;
  return (
    <Flex direction="column" gap="2">
      <MaxBalanceButton
        max={"0"} // Todo , will change to balance
        handleInputChange={(value: string) => {
          setAmount(value);
        }}
      />
      <OutputField value={formatEther(quote.out ?? 0n)} disabled />
      <Button variant="solid">Swap</Button>
    </Flex>
  );
};
