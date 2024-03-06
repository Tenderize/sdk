import { Flex } from "@radix-ui/themes";
import { ConnectKitButton } from "connectkit";
import MaxBalanceButton from "../components/MaxBalanceButton";
import { Button } from "../components/Button";
import { useState } from "react";
import { useSelectedToken } from "@/hooks/selectedToken";

export const Unstake = () => {
  const [amount, setAmount] = useState<bigint>(0n);
  const { token, tenderizer } = useSelectedToken();
  return (
    <Flex direction="column" gap="2">
      <MaxBalanceButton
        tokenAddress={tenderizer}
        handleInputChange={(value: bigint) => {
          setAmount(value)
          console.log(value);
        }}
      />
      <ConnectKitButton /> {/* Todo: use wagmi config to change buttons */}
      <Button variant="solid">Unstake</Button>
    </Flex>
  );
};
