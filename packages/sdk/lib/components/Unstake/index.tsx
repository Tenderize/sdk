import { FC, useState } from "react";
import { Flex } from "@radix-ui/themes";
import { ConnectKitButton } from "connectkit";

import MaxBalanceButton from "@lib/components/MaxBalanceButton";
import { Button } from "@lib/components/Button";
import { useSelectedToken } from "@lib/hooks";

export const Unstake: FC = () => {
  const [amount, setAmount] = useState<bigint>(0n);
  const { token, tenderizer } = useSelectedToken();
  amount;
  token;
  return (
    <Flex direction="column" gap="2">
      <MaxBalanceButton
        tokenAddress={tenderizer}
        handleInputChange={(value: bigint) => {
          if (value && value != amount)
            setAmount(value)
        }}
      />
      <ConnectKitButton /> {/* Todo: use wagmi config to change buttons */}
      <Button variant="solid">Unstake</Button>
    </Flex>
  );
};
