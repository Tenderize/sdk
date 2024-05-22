import {
  Button,
  CalloutLayout,
  InputField,
  MaxBalanceButton,
  OutputField,
  TokenSelector,
} from "@lib/components";
import { useChainId, useTenderizer } from "@lib/config/store";
import { ActionEnums } from "@lib/constants";
import { useSelectedToken } from "@lib/contexts";
import { useERC20Balance, useQuote } from "@lib/hooks";
import { Flex } from "@radix-ui/themes";
import { useState, type FC } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";

export const Swap: FC = () => {
  const [amount, setAmount] = useState<string>("");
  const token = useSelectedToken();
  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);
  const { address: userAddress } = useAccount();
  const { balance } = useERC20Balance(tenderizer, userAddress, chainId);
  const { quote } = useQuote(
    token.slug,
    tenderizer,
    parseEther(amount),
    chainId
  );
  console.log(quote);

  return (
    <Flex gap="2" content="between" direction="column">
      <CalloutLayout
        callOutFirstChildren={
          <div className="gap-2 justify-between flex flex-col w-full">
            <span className="text-sm text-primary-foreground">You Swap</span>
            <InputField
              className="bg-card  px-3 focus:outline-none rounded-lg w-full text-primary-foreground"
              max={formatEther(balance)}
              style={{ fontSize: 30 }}
              handleChange={(value: string) => {
                setAmount(value || "0");
              }}
              value={amount}
              icon={<TokenSelector action={ActionEnums.UNSTAKE} />}
            />
            <MaxBalanceButton
              max={formatEther(balance)}
              handleInputChange={setAmount}
            />
          </div>
        }
        callOutSecondChildren={
          <div className="flex flex-col gap-2 w-full">
            <span className="text-sm text-primary-foreground">You Receive</span>
            <OutputField
              className="bg-card px-3 focus:outline-none rounded-lg w-full"
              style={{ fontSize: 30 }}
              value={amount}
              icon={
                <div className="flex items-center gap-2">
                  <img
                    width={25}
                    height={25}
                    src={token.img?.token}
                    alt={token.name}
                  />
                  <span className="text-sm">{`t${token.currency}`}</span>
                </div>
              }
            />
          </div>
        }
        callOutActionChildren={
          <div className="w-full gap-2 flex">
            <Button primary className="w-full" size="4" variant="solid">
              Swap {token.currency}
            </Button>
          </div>
        }
      ></CalloutLayout>
    </Flex>
  );
};
