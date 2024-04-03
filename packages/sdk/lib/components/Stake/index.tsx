import {
  Button,
  CalloutLayout,
  InputField,
  MaxBalanceButton,
  OutputField,
  SwitchChainButton,
  TokenSelector,
} from "@lib/components";
import { useChainId, useTenderizer } from "@lib/config/store";
import { useSelectedToken } from "@lib/contexts";
import {
  useDeposit,
  useERC20Allowance,
  useERC20Approve,
  useERC20Balance,
  usePreviewDeposit,
} from "@lib/hooks";
import { isMutationPending } from "@lib/utils/global";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import { useEffect, useState, type FC } from "react";
import { formatEther, parseEther, type Address } from "viem";
import { useAccount, useChainId as useCurrentChainId } from "wagmi";

export const Stake: FC = () => {
  const [amount, setAmount] = useState<string>("");
  const token = useSelectedToken();
  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);
  const { address: user } = useAccount();
  const currentChainId = useCurrentChainId();

  const { previewDeposit } = usePreviewDeposit(
    tenderizer,
    parseEther(amount),
    chainId
  );

  const { address: userAddress } = useAccount();

  const { balance } = useERC20Balance(token.address, userAddress, chainId);

  const { allowance } = useERC20Allowance(
    token.address,
    user ?? ("" as Address),
    tenderizer,
    chainId
  );

  const {
    mutate: approve,
    data: approval,
    status: approveStatus,
  } = useERC20Approve(token.address, tenderizer, parseEther(amount), chainId);

  const { mutate: deposit, status: depositStatus } = useDeposit(
    tenderizer,
    parseEther(amount),
    chainId
  );

  // used to rest the amount after a successful deposit
  useEffect(() => {
    if (depositStatus === "success") {
      setAmount("");
    }
  }, [depositStatus]);

  return (
    <div className="gap-2 justify-between flex flex-col">
      <CalloutLayout
        callOutFirstChildren={
          <div className="gap-2 justify-between flex flex-col w-full">
            <span className="text-sm">You Stake</span>
            <InputField
              className="bg-callout-soft px-3 focus:outline-none rounded-lg w-full"
              max={formatEther(balance)}
              style={{ fontSize: 30 }}
              handleChange={(value: string) => {
                setAmount(value || "0");
              }}
              value={amount}
              icon={<TokenSelector />}
            />
            <MaxBalanceButton
              max={formatEther(balance)}
              handleInputChange={(value: string) => {
                setAmount(value);
              }}
            />
          </div>
        }
        callOutSecondChildren={
          <div className="flex flex-col gap-2 w-full">
            <span className="text-sm">You Receive</span>
            <OutputField
              className="bg-callout-soft px-3 focus:outline-none rounded-lg w-full"
              style={{ fontSize: 30 }}
              value={formatEther(previewDeposit ?? 0n)}
              icon={
                <div className="flex items-center gap-2">
                  <img
                    width={30}
                    height={30}
                    src={token.img?.tToken}
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
            {(() => {
              if (currentChainId !== chainId) {
                return <SwitchChainButton requiredChainId={chainId} />;
              }

              if (depositStatus === "success") {
                return (
                  <Button
                    style={{ width: "100%", pointerEvents: "none" }}
                    size="4"
                    variant="soft"
                    color="green"
                  >
                    <Flex gap="2" align="center">
                      <CheckCircledIcon />
                      <Text>Staked {token.currency}</Text>
                    </Flex>
                  </Button>
                );
              }
              if (!approval && allowance < parseEther(amount)) {
                return (
                  <Button
                    className={
                      isMutationPending(approveStatus) ? "animate-pulse" : ""
                    }
                    disabled={
                      !previewDeposit || isMutationPending(approveStatus)
                    }
                    style={{ width: "100%" }}
                    size="4"
                    onClick={() => approve()}
                    variant="solid"
                  >
                    {isMutationPending(approveStatus) ? (
                      <>Approving {token.currency}...</>
                    ) : (
                      <>Approve {token.currency}</>
                    )}
                  </Button>
                );
              }
              return (
                <Button
                  className={
                    isMutationPending(depositStatus) ? "animate-pulse" : ""
                  }
                  disabled={!previewDeposit || isMutationPending(depositStatus)}
                  style={{ width: "100%" }}
                  size="4"
                  onClick={() => deposit()}
                  variant="solid"
                >
                  {isMutationPending(depositStatus) ? (
                    <>Staking {token.currency}...</>
                  ) : (
                    <>Stake {token.currency}</>
                  )}
                </Button>
              );
            })()}
          </div>
        }
      ></CalloutLayout>
    </div>
  );
};
