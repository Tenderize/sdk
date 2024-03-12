import { Button } from "@lib/components/Button";
import MaxBalanceButton from "@lib/components/MaxBalanceButton";
import { useSelectedToken } from "@lib/hooks";
import { Flex, Text } from "@radix-ui/themes";
import { useState, type FC } from "react";
import { OutputField } from "..";
import { CalloutLayout } from "../CalloutLayout";

export const Unstake: FC = () => {
  const [amount, setAmount] = useState<bigint>(0n);
  const { token, tenderizer } = useSelectedToken();
  return (
    <CalloutLayout
      callOutFirstChildren={
        <Flex gap="2" content="between" direction="column" p="2">
          <Text size="2">You Unstake</Text>
          <MaxBalanceButton
            method="unstake"
            tokenAddress={tenderizer}
            tokenSlug={token.slug}
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
                <img
                  width={25}
                  height={25}
                  src={token.img?.token}
                  alt={token.name}
                />
                <Text size="3">{`${token.currency}`}</Text>
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
            onClick={() => {}}
            variant="solid"
          >
            Unstake {token.currency}
          </Button>
        </Flex>
      }
    ></CalloutLayout>
  );
};
