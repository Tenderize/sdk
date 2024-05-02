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
import { ActionEnums } from "@lib/constants";
import { useSelectedToken } from "@lib/contexts";
import {
  useERC20Approve,
  useERC20Balance,
  useQuote,
  useSwap,
} from "@lib/hooks";
import { formatAmount, formatFloatstring } from "@lib/utils/floats";
import { isMutationPending } from "@lib/utils/global";
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import { useEffect, useState, type FC } from "react";
import { formatEther, parseEther, type Address } from "viem";
import { useAccount, useChainId as useCurrentChainId } from "wagmi";

export const Swap: FC = () => {
  const [amount, setAmount] = useState<string>("");
  const token = useSelectedToken();
  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);
  const { address: userAddress } = useAccount();
  const currentChainId = useCurrentChainId();

  const { balance } = useERC20Balance(tenderizer, userAddress, chainId);

  const {
    mutate: approve,
    data: approval,
    status: approveStatus,
  } = useERC20Approve(
    tenderizer,
    token.tenderswap as Address,
    parseEther(amount),
    chainId
  );

  const { quote } = useQuote(
    token.slug,
    tenderizer,
    parseEther(amount),
    chainId
  );

  const { mutate: swap, status: swapStatus } = useSwap(
    token?.tenderswap as Address,
    tenderizer,
    parseEther(amount),
    quote.out,
    chainId
  );
  // used to rest the amount after a successful swap
  useEffect(() => {
    if (swapStatus === "success") {
      setAmount("");
    }
  }, [swapStatus]);

  const swapFeePercentage = quote?.fee
    ? formatFloatstring(
        (
          (parseFloat(formatEther(quote.fee)) /
            parseFloat(formatEther(quote.out))) *
          100
        ).toString(),
        4
      )
    : 0;

  return (
    <Flex gap="2" content="between" direction="column">
      <CalloutLayout
        callOutFirstChildren={
          <Flex gap="2" content="between" direction="column" width="100%">
            <Text size="2">You Swap</Text>
            <InputField
              variant="soft"
              max={formatEther(balance)}
              style={{ width: "100%", fontSize: 30 }}
              handleChange={setAmount}
              value={amount}
              icon={<TokenSelector action={ActionEnums.UNSTAKE} />}
            />
            <MaxBalanceButton
              max={formatEther(balance)}
              handleInputChange={setAmount}
            />
          </Flex>
        }
        callOutSecondChildren={
          <Flex direction="column" gap="2" width="100%">
            <Text size="2">You Receive</Text>
            <OutputField
              variant="soft"
              className=""
              style={{ width: "100%", fontSize: 30 }}
              value={formatEther(quote.out ?? 0n)}
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

            <span className="text-sm">{`Expected swap fees: ${formatAmount(
              quote.fee
            )} t${token?.currency} (${swapFeePercentage} %)`}</span>
          </Flex>
        }
        callOutActionChildren={
          <div className="flex flex-col gap-2 w-full">
            <Flex gap="2" width="100%">
              {(() => {
                if (currentChainId !== chainId) {
                  return <SwitchChainButton requiredChainId={chainId} />;
                }

                if (swapStatus === "success") {
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
                if (!approval) {
                  return (
                    <Button
                      className={
                        isMutationPending(approveStatus) ? "animate-pulse" : ""
                      }
                      disabled={!amount || isMutationPending(approveStatus)}
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
                      isMutationPending(swapStatus) ? "animate-pulse" : ""
                    }
                    disabled={!amount || isMutationPending(swapStatus)}
                    style={{ width: "100%" }}
                    size="4"
                    onClick={() => swap?.()}
                    variant="solid"
                  >
                    {isMutationPending(swapStatus) ? (
                      <>Swaping {token.currency}...</>
                    ) : (
                      <>Swap {token.currency}</>
                    )}
                  </Button>
                );
              })()}
            </Flex>
            <div
              className={`${
                parseFloat(swapFeePercentage.toString()) > 0.02 ? "hidden" : ""
              } bg-orange-100 p-4 my-2 dark:bg-transparent rounded-md dark:text-light-white flex items-center gap-4 ${
                quote && quote.fee > 0.05 ? "" : "hidden"
              }`}
            >
              <ExclamationTriangleIcon className="text-orange-700 text-lg" />
              <div>
                <span className="font-bold text-sm text-orange-700">
                  Swap Fee {swapFeePercentage} %
                </span>
              </div>
            </div>
          </div>
        }
      ></CalloutLayout>
    </Flex>
  );
};
