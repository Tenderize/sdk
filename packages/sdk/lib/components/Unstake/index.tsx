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
  console.log("token", token);
  console.log("tenderizer", tenderizer);
  return (
    <CalloutLayout
      callOutFirstChildren={
        <Flex gap="2" content="between">
          <MaxBalanceButton
            tokenAddress={tenderizer}
            handleInputChange={(value: bigint) => {
              setAmount(value);
            }}
          />
        </Flex>
      }
      callOutSecondChildren={
        <OutputField
          variant="soft"
          className=""
          style={{ width: "100%", fontSize: 30 }}
          value={amount.toString()}
          icon={
            <Flex align="center" gap="1">
              <Text size="2">{`t${token.currency}`}</Text>
              <img
                width={25}
                height={25}
                src={token.img?.tToken}
                alt={token.name}
              />
            </Flex>
          }
        />
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
