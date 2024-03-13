import { useChainId, useTenderizer } from "@lib/config/store";
import { TOKENS, TOKEN_ADDRESSES } from "@lib/constants";
import { useSelectedToken } from "@lib/contexts";
import { useUnlocks, useWithdraw } from "@lib/hooks";
import { formatAmount } from "@lib/utils/floats";
import { formatMaturity } from "@lib/utils/global";
import { ClockIcon, CountdownTimerIcon } from "@radix-ui/react-icons";
import { Badge, Flex, Grid, Heading, Separator, Text } from "@radix-ui/themes";
import type { CSSProperties, FC } from "react";
import React from "react";
import { parseEther, type Address, type Hex } from "viem";
import { useAccount } from "wagmi";
import { Button, Callout } from "..";

interface WithdrawProps {
  style?: CSSProperties;
}

// Todo: Replace the mock data with the actual data, in useUnlocks hook

export const Withdraw: FC<WithdrawProps> = (props) => {
  const { style } = props;
  const token = useSelectedToken();
  const { address: user } = useAccount();
  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);

  const { unlocks } = useUnlocks(tenderizer, user ?? ("" as Address), chainId);

  const { mutate: withdraw } = useWithdraw(tenderizer, chainId);
  if (!unlocks) return null;
  return (
    <Callout variant="surface" style={{ ...style }}>
      <Heading size="4">Your balance</Heading>
      <Separator orientation="horizontal" size="4" />
      <Grid
        style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
        columns="3"
        gap="4"
        width="auto"
      >
        {unlocks?.map((item, index) => (
          <React.Fragment key={index}>
            <Flex align="center">
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
                    src={
                      TOKENS[
                        TOKEN_ADDRESSES[item.tenderizer.asset.id as Address]
                      ].img.tToken
                    }
                  ></img>
                  {/* Assuming item.amount is the placeholder */}
                  <Text size="1">{formatAmount(parseEther(item.amount))}</Text>
                </Flex>
              </Badge>
            </Flex>
            <Flex align="center" justify="end">
              <Badge
                color="orange"
                variant="soft"
                radius="full"
                style={{ width: "100%", padding: "10px", minWidth: "150px" }}
              >
                {item.maturity > 0 ? <CountdownTimerIcon /> : <ClockIcon />}
                {item.maturity > 0
                  ? `${formatMaturity(item.maturity)} left`
                  : "Ready to withdraw"}
              </Badge>
            </Flex>
            <Flex align="center" justify="center">
              {item.maturity > 0 ? (
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
                  style={{ minWidth: "150px", height: "100%" }}
                  onClick={() => {
                    const unlockID = item.id as Hex;
                    withdraw?.(unlockID);
                  }}
                  variant="solid"
                >
                  <ClockIcon />
                  Withdraw
                </Button>
              )}
            </Flex>
          </React.Fragment>
        ))}
      </Grid>
    </Callout>
  );
};
