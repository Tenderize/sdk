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
import { Button, Callout, Card } from "..";

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
      className="w-full px-3"
      variant="surface"
      style={{ ...style, display: "flex", flexDirection: "column" }}
    >
      <Heading className="w-full" size="3">
        Pending Unlocks
      </Heading>
      <Separator className="w-full" orientation="horizontal" size="4" />
      <Grid
        className="w-full grid-cols-1 sm:grid-cols-3 max-h-[150px] overflow-y-auto  gap-4"
        width="100%"
      >
        {unlocks?.map((item, index) => {
          const isMature = item.maturity >= (time || 0);
          const isWithdrawLoading =
            isMutationPending(withdrawStatus) && activeUnlockId === item.id;
          return (
            <React.Fragment key={index}>
              {/* card for mobile view */}
              <Card className="sm:hidden" variant="surface">
                <Flex align="center" justify="between">
                  <img
                    width={40}
                    height={40}
                    alt="name"
                    src={token.img?.tToken}
                  ></img>
                  <Flex direction="column" gap="1">
                    <Text size="2">
                      {formatAmount(parseEther(item.amount))}
                    </Text>
                    <Flex align="center" gap="1">
                      {isMature ? <CountdownTimerIcon /> : <ClockIcon />}
                      <Text size="1">
                        {isMature
                          ? formatMaturity(
                              token.slug === TokenSlugEnums.MATIC
                                ? (Number(item.maturity) - Number(time)) * 2250
                                : (Number(item.maturity) - Number(time)) * 13
                            ) + " left"
                          : "Ready to withdraw"}
                      </Text>
                    </Flex>
                  </Flex>
                  <div className="w-[120px] h-[40px] flex">
                    <GridActionButton
                      isMature={isMature}
                      isWithdrawLoading={isWithdrawLoading}
                      setActiveUnlockId={setActiveUnlockId}
                      item={item}
                      token={token}
                      withdraw={withdraw}
                    />
                  </div>
                </Flex>
              </Card>
              {/* tablet and desktop view  */}
              <Badge
                className="w-full py-[3px] px-[5px] min-h-[40px] hidden sm:flex"
                radius="full"
              >
                <Flex align="center" gap="2">
                  <img
                    width={30}
                    height={30}
                    alt="name"
                    src={token.img?.tToken}
                  ></img>
                  <Text size="2">{formatAmount(parseEther(item.amount))}</Text>
                </Flex>
              </Badge>

              <Badge
                className="hidden sm:flex"
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
              <div className="hidden sm:block w-full">
                <GridActionButton
                  isMature={isMature}
                  isWithdrawLoading={isWithdrawLoading}
                  setActiveUnlockId={setActiveUnlockId}
                  item={item}
                  token={token}
                  withdraw={withdraw}
                />
              </div>
            </React.Fragment>
          );
        })}
      </Grid>
    </Callout>
  );
};

interface GridActionButtonProps {
  isMature: boolean;
  isWithdrawLoading: boolean;
  setActiveUnlockId: (unlockId: Address) => void;
  item: {
    id: string;
  };
  token: {
    currency: string;
  };
  withdraw?: (unlockId: Address) => void;
}

const GridActionButton: FC<GridActionButtonProps> = ({
  isMature,
  isWithdrawLoading,
  setActiveUnlockId,
  item,
  token,
  withdraw,
}) => {
  if (isMature) {
    return (
      <Button
        variant="soft"
        className="h-full w-full"
        style={{
          pointerEvents: "none",
        }}
      >
        <CountdownTimerIcon className="hidden sm:block" />
        Unstaking
      </Button>
    );
  } else {
    return (
      <Button
        className={`w-full h-full ${isWithdrawLoading ? "animate-pulse" : ""}`}
        disabled={isWithdrawLoading}
        onClick={() => {
          const unlockID = item.id as Hex;
          setActiveUnlockId(unlockID);
          withdraw?.(unlockID);
        }}
        variant="solid"
      >
        <ClockIcon className="hidden sm:block" />
        {isWithdrawLoading ? (
          <>Withdrawing {token.currency}...</>
        ) : (
          <>Withdraw {token.currency}</>
        )}
      </Button>
    );
  }
};
