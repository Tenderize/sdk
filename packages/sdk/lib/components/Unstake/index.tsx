import {
  Button,
  CalloutLayout,
  InputField,
  MaxBalanceButton,
  OutputField,
  TokenSelector,
  Withdraw,
} from "@lib/components";
import { useChainId, useTenderizer } from "@lib/config/store";
import { ActionEnums } from "@lib/constants";
import { useSelectedToken } from "@lib/contexts";
import { useERC20Balance } from "@lib/hooks";
import { useUnlocks, useUnstake } from "@lib/hooks/unlocks";
import { Flex, Text } from "@radix-ui/themes";
import { useState, type FC } from "react";
import { formatEther, type Address } from "viem";
import { useAccount } from "wagmi";

export const Unstake: FC = () => {
  const [amount, setAmount] = useState<bigint>(0n);
  const token = useSelectedToken();
  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);
  const { address: userAddress } = useAccount();
  const { balance } = useERC20Balance(tenderizer, userAddress, chainId);

  const { mutate: unstake } = useUnstake(
    tenderizer,
    amount,
    chainId
  );
  const { address: user } = useAccount();

  const unlocks = useUnlocks(tenderizer, user ?? ("" as Address), chainId);
  unlocks;

  return (
    <Flex gap="2" content="between" direction="column" p="2">
      <Withdraw />
      <CalloutLayout
        callOutFirstChildren={
          <Flex gap="2" content="between" direction="column" p="2" width="100%">
            <Text size="2">You Unstake</Text>
            <InputField
              variant="soft"
              className=""
              max={balance}
              style={{ width: "100%", fontSize: 30 }}
              handleChange={setAmount}
              value={amount}
              icon={<TokenSelector action={ActionEnums.UNSTAKE} />}
            />
            <MaxBalanceButton
              max={balance}
              handleInputChange={setAmount}
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
              value={formatEther(amount)}
              icon={
                <Flex align="center" gap="2">
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
              onClick={() => {
                unstake?.();
              }}
              variant="solid"
            >
              Unstake {token.currency}
            </Button>
          </Flex>
        }
      ></CalloutLayout>
    </Flex>
  );
};
