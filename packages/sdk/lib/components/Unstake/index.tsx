import { Button } from "@lib/components/Button";
import MaxBalanceButton from "@lib/components/MaxBalanceButton";
import { Flex, Text } from "@radix-ui/themes";
import { useState, type FC } from "react";
import { OutputField } from "..";
import { CalloutLayout } from "../CalloutLayout";
import { useTenderizer, useChainId } from "@lib/config/store";
import { useSelectedToken } from "@lib/contexts";
import { useUnlocks } from "@lib/hooks/unlocks";
import { useAccount } from "wagmi";
import type { Address } from "viem";

export const Unstake: FC = () => {
  const [amount, setAmount] = useState<bigint>(0n);
  const token = useSelectedToken();
  const tenderizer = useTenderizer(token.slug)
  const chainId = useChainId(token.slug)
  const { address: user } = useAccount()

  const unlocks = useUnlocks(tenderizer, user ?? "" as Address, chainId)
  unlocks;

  return (
    <CalloutLayout
      callOutFirstChildren={
        <Flex gap="2" content="between" direction="column" p="2">
          <Text size="2">You Unstake</Text>
          <MaxBalanceButton
            tokenAddress={tenderizer}
            handleInputChange={(value: bigint) => {
              setAmount(value);
            }}
          />
        </Flex>
      }
      callOutSecondChildren={
        <Flex direction="column" gap="2" p="2" width="100%">
          <Text size="2">You Recieve</Text>
          <OutputField
            variant="soft"
            className=""
            style={{ width: "100%", fontSize: 30 }}
            value={amount.toString()}
            icon={
              <Flex align="center" gap="1">
                <Text size="2">{`${token.currency}`}</Text>
                <img
                  width={25}
                  height={25}
                  src={token.img?.token}
                  alt={token.name}
                />
              </Flex>
            }
          />
        </Flex>
      }
      callOutActionChildren={
        <Flex gap="2" width="100%">
          <Button
            style={{ width: "100%" }}
            size="3"
            onClick={() => { }}
            variant="solid"
          >
            Unstake {token.currency}
          </Button>
        </Flex>
      }
    ></CalloutLayout>
  );
};
