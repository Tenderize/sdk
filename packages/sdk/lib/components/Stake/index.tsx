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
            <span className="text-sm text-primary-foreground">You Stake</span>
            <InputField
              className="bg-card  px-3 focus:outline-none rounded-lg w-full text-primary-foreground"
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
            <span className="text-sm text-primary-foreground">You Receive</span>
            <OutputField
              className="bg-card px-3 focus:outline-none rounded-lg w-full"
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
                    className="text-success-foreground bg-success w-full"
                    style={{ pointerEvents: "none" }}
                    size="4"
                  >
                    <div className="flex gap-2 items-center">
                      <CheckCircledIcon />
                      <span className="text-success-foreground">
                        Staked {token.currency}
                      </span>
                    </div>
                  </Button>
                );
              }
              const depositDisabled =
                !previewDeposit || isMutationPending(depositStatus);
              const buttonClass = `${
                depositDisabled ? "bg-disabled" : "bg-primary"
              } ${
                depositDisabled
                  ? "text-disabled-foreground"
                  : "text-primary-accent"
              }
                 ${isMutationPending(depositStatus) ? "animate-pulse" : ""}`;

              if (!approval && allowance < parseEther(amount)) {
                return (
                  <Button
                    className={buttonClass}
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
                  className={buttonClass}
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
