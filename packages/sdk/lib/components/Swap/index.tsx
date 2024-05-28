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
  GlobeIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState, type ChangeEvent, type FC } from "react";
import { formatEther, parseEther, type Address } from "viem";
import { useAccount, useChainId as useCurrentChainId } from "wagmi";

export const Swap: FC = () => {
  const [amount, setAmount] = useState<string>("");
  const token = useSelectedToken();
  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);
  const { address: userAddress } = useAccount();
  const currentChainId = useCurrentChainId();

  // Todo: add slippage tolerance dynamic input
  const [slippageToleranceValue, setSlippageToleranceValue] = useState(1);

  const { balance } = useERC20Balance(tenderizer, userAddress, chainId);
  const {
    mutate: approve,
    data: approval,
    status: approveStatus,
    reset: resetApproval,
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
  console.log(quote);

  const slippageTolerance = slippageToleranceValue / 100;
  const minOut =
    quote?.out -
    (quote?.out * parseEther(slippageTolerance.toString())) / parseEther("100");

  const { mutate: swap, status: swapStatus } = useSwap(
    token?.tenderswap as Address,
    tenderizer,
    parseEther(amount),
    minOut,
    chainId
  );
  // Reset amount and approval after successful swap
  useEffect(() => {
    if (swapStatus === "success") {
      setAmount("");
      resetApproval();
    }
  }, [resetApproval, swapStatus]);

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
    <div className="gap-2 justify-between flex flex-col">
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
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <GlobeIcon className="text-lg text-secondary-foreground" />
                <span className="text-[12px] text-secondary-foreground">{`Expected swap fees: ${formatAmount(
                  quote.fee
                )} t${token?.currency} (${swapFeePercentage} %)`}</span>
              </div>
              <div className="flex items-center gap-1">
                <RocketIcon className=" text-lg text-secondary-foreground" />
                <span className="text-[12px] text-secondary-foreground">
                  Slippage threshold:
                </span>
                <input
                  type="number"
                  min={1}
                  max={10}
                  className="border border-gray-300 rounded-md py-2  w-15 h-10 text-center outline-none text-secondary-foreground"
                  style={{ fontSize: 15, height: "20px" }}
                  onKeyDown={() => {
                    setSlippageToleranceValue(0);
                  }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    let { value } = e.target;
                    if (!value) {
                      value = "1";
                    }

                    let numericValue = parseFloat(value);

                    // Ensure the value is within the allowed range
                    if (numericValue < 1) {
                      numericValue = 1;
                    } else if (numericValue > 10) {
                      numericValue = 10;
                    }

                    setSlippageToleranceValue(numericValue);
                  }}
                  value={slippageToleranceValue.toString()}
                />
                <span className="text-[12px]">%</span>
              </div>
            </div>
          </div>
        }
        callOutActionChildren={
          <div className="flex flex-col gap-2 w-full">
            <div className="flex w-full gap-2">
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
                      <div className="flex items-center gap-2">
                        <CheckCircledIcon />
                        <span>Swapped {token.currency}</span>
                      </div>
                    </Button>
                  );
                }
                if (!approval) {
                  return (
                    <Button
                      className="w-full"
                      disabled={!amount || isMutationPending(approveStatus)}
                      primary
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
                    className={"w-full"}
                    disabled={!amount || isMutationPending(swapStatus)}
                    style={{ width: "100%" }}
                    size="4"
                    onClick={() => swap?.()}
                    variant="solid"
                    primary
                  >
                    {isMutationPending(swapStatus) ? (
                      <>Swaping {token.currency}...</>
                    ) : (
                      <>Swap {token.currency}</>
                    )}
                  </Button>
                );
              })()}
            </div>

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
    </div>
  );
};
