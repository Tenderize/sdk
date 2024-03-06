import { Flex } from "@radix-ui/themes";
import { ConnectKitButton } from "connectkit";
import MaxBalanceButton from "../components/MaxBalanceButton";
import { Button } from "../components/Button";
import { InputNumber } from "../components/InputNumber";
import { useState } from "react";
import { usePreviewDeposit } from "@/hooks/deposit";
import { useSelectedToken } from "@/hooks/selectedToken";
import { formatEther } from "viem";
import { useQuote } from "@/hooks/swap";

export const Swap = () => {
  const [amount, setAmount] = useState<bigint>(0n);
  const { token, tenderizer } = useSelectedToken();
  const { quote, isLoading, isError } = useQuote(token.slug, tenderizer, amount, token.chainId);
  return (
    <Flex direction="column" gap="2">
      <MaxBalanceButton
        tokenAddress={tenderizer}
        handleInputChange={(value: bigint) => {
          setAmount(value)
          console.log(value);
        }}
      />
      <InputNumber value={formatEther(quote.out ?? 0n)} disabled />
      <ConnectKitButton /> {/* Todo: use wagmi config to change buttons */}
      <Button variant="solid">Swap</Button>
    </Flex>
  );
};
