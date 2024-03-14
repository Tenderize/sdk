import { useChainId, useTenderizer } from "@lib/config/store";
import { TokenSlugEnums } from "@lib/constants";
import { useSelectedToken } from "@lib/contexts";
import { useUnlocks, useWithdraw } from "@lib/hooks";
import { useAdapterTime } from "@lib/hooks/adapter";
import { formatAmount } from "@lib/utils/floats";
import { formatMaturity, isMutationPending } from "@lib/utils/global";
import { ClockIcon, CountdownTimerIcon } from "@radix-ui/react-icons";
import { Badge, Flex, Grid, Heading, Separator, Text } from "@radix-ui/themes";
import type { CSSProperties, FC } from "react";
import React, { useState } from "react";
import { parseEther, type Address, type Hex } from "viem";
import { useAccount } from "wagmi";
import { Button, Callout } from "..";

interface WithdrawProps {
  style?: CSSProperties;
}

export const Withdraw: FC<WithdrawProps> = (props) => {
  const [activeUnlockId, setActiveUnlockId] = useState<Hex>("" as Hex);
  const { style } = props;
  const token = useSelectedToken();
  const { address: user } = useAccount();
  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);
  const { time } = useAdapterTime(token.slug);

  const { unlocks } = useUnlocks(
    token.slug,
    tenderizer,
    user ?? ("" as Address),
    chainId
  );

  const { mutate: withdraw, status: withdrawStatus } = useWithdraw(
    tenderizer,
    chainId
  );

  if (!unlocks || unlocks?.length === 0) return null;
  return (
    <Callout
      size="3"
      className="w-full"
      variant="surface"
      style={{ ...style, display: "flex", flexDirection: "column" }}
    >
      <Heading className="w-full" size="3">
        Pending Unlocks
      </Heading>
      <Separator className="w-full" orientation="horizontal" size="4" />
      <Grid
        className="w-full"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          maxHeight: 150,
          overflowY: "auto",
        }}
        columns="3"
        gap="4"
        width="auto"
      >
        {unlocks?.map((item, index) => {
          const isMature = item.maturity >= (time || 0);
          const isWithdrawLoading =
            isMutationPending(withdrawStatus) && activeUnlockId === item.id;
          return (
            <React.Fragment key={index}>
              <Badge
                variant="soft"
                radius="full"
                style={{
                  width: "100%",
                  padding: "3px 5px 3px 5px",
                  minWidth: "150px",
                }}
              >
                <Flex align="center" gap="2">
                  <img
                    width={30}
                    height={30}
                    alt="name"
                    src={token.img?.tToken}
                  ></img>
                  <Text size="1">{formatAmount(parseEther(item.amount))}</Text>
                </Flex>
              </Badge>

              <Badge
                color="orange"
                variant="soft"
                radius="full"
                style={{ width: "100%", padding: "10px", minWidth: "150px" }}
              >
                {isMature ? <CountdownTimerIcon /> : <ClockIcon />}
                {isMature
                  ? `${formatMaturity(
                      token.slug === TokenSlugEnums.MATIC
                        ? (Number(item.maturity) - Number(time)) * 2250
                        : (Number(item.maturity) - Number(time)) * 13
                    )} left`
                  : "Ready to withdraw"}
              </Badge>

              {isMature ? (
                <Button
                  variant="soft"
                  style={{
                    minWidth: "150px",
                    pointerEvents: "none",
                    height: "100%",
                  }}
                >
                  <CountdownTimerIcon />
                  Unstaking
                </Button>
              ) : (
                <Button
                  className={isWithdrawLoading ? "animate-pulse" : ""}
                  disabled={isWithdrawLoading}
                  style={{ minWidth: "150px", height: "100%" }}
                  onClick={() => {
                    const unlockID = item.id as Hex;
                    setActiveUnlockId(unlockID);
                    withdraw?.(unlockID);
                  }}
                  variant="solid"
                >
                  <ClockIcon />
                  {isWithdrawLoading ? (
                    <>Withdrawing {token.currency}...</>
                  ) : (
                    <>Withdraw {token.currency}</>
                  )}
                </Button>
              )}
            </React.Fragment>
          );
        })}
      </Grid>
    </Callout>
  );
};
