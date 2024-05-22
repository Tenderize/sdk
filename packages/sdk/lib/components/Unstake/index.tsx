import {
  Button,
  CalloutLayout,
  InputField,
  MaxBalanceButton,
  OutputField,
  SwitchChainButton,
  TokenSelector,
  Withdraw,
} from "@lib/components";
import { useChainId, useTenderizer } from "@lib/config/store";
import { ActionEnums } from "@lib/constants";
import { useSelectedToken } from "@lib/contexts";
import { useERC20Balance } from "@lib/hooks";
import { useUnstake } from "@lib/hooks/unlocks";
import { isMutationPending } from "@lib/utils/global";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import { useEffect, useState, type FC } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount, useChainId as useCurrentChainId } from "wagmi";

export const Unstake: FC = () => {
  const [amount, setAmount] = useState<string>("");
  const token = useSelectedToken();
  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);
  const { address: userAddress, isConnected } = useAccount();
  const { balance } = useERC20Balance(tenderizer, userAddress, chainId);
  const currentChainId = useCurrentChainId();
  const { mutate: unstake, status: unstakeStatus } = useUnstake(
    tenderizer,
    parseEther(amount),
    chainId
  );

  // used to rest the amount after a successful deposit
  useEffect(() => {
    if (unstakeStatus === "success") {
      setAmount("");
    }
  }, [unstakeStatus]);

  return (
    <Flex gap="2" content="between" direction="column">
      <Withdraw />
      <CalloutLayout
        callOutFirstChildren={
          <div className="gap-2 justify-between flex flex-col w-full">
            <span className="text-sm text-primary-foreground">You Unstake</span>
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
                  <span className="text-sm">{`${token.currency}`}</span>
                </div>
              }
            />
          </div>
        }
        callOutActionChildren={
          <div className="w-full gap-2 flex">
            {(() => {
              if (currentChainId !== chainId || !isConnected) {
                return <SwitchChainButton requiredChainId={chainId} />;
              }
              if (unstakeStatus === "success") {
                return (
                  <Button className="w-full" success size="4">
                    <div className="flex gap-2 items-center">
                      <CheckCircledIcon />
                      <span>Unstaked {token.currency}</span>
                    </div>
                  </Button>
                );
              }
              return (
                <Button
                  disabled={
                    !parseEther(amount) || isMutationPending(unstakeStatus)
                  }
                  primary
                  className="w-full"
                  size="4"
                  onClick={() => {
                    unstake?.();
                  }}
                  variant="solid"
                >
                  {isMutationPending(unstakeStatus) ? (
                    <>Unstaking {token.currency}...</>
                  ) : (
                    <>Unstake {token.currency}</>
                  )}
                </Button>
              );
            })()}
          </div>
        }
      ></CalloutLayout>
    </Flex>
  );
};
