import { useChainId, useTenderizer } from "@lib/config/store";
import { TOKENS } from "@lib/constants";
import { useSelectedToken } from "@lib/contexts";
import { useUnlocks, useWithdraw } from "@lib/hooks";
import { ClockIcon, CountdownTimerIcon } from "@radix-ui/react-icons";
import { Badge, Flex, Grid, Heading, Separator, Text } from "@radix-ui/themes";
import type { CSSProperties, FC } from "react";
import type { Address } from "viem";
import { useAccount } from "wagmi";
import { Button, Callout } from "..";

interface WithdrawProps {
  style?: CSSProperties;
}

// Todo: Everything is for static hardcoded data, need to make it dynamic use unlocks

export const Withdraw: FC<WithdrawProps> = (props) => {
  const { style } = props;
  const token = useSelectedToken();
  const { address: user } = useAccount();
  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);

  const { unlocks } = useUnlocks(tenderizer, user ?? ("" as Address), chainId);
  unlocks; // Todo: use unlocks to make grid table

  const { mutate: withdraw } = useWithdraw(tenderizer, chainId);

  return (
    <>
      <Callout variant="surface" style={{ ...style }}>
        <Heading size="4">Your balance</Heading>
        <Separator orientation="horizontal" size="4" />
        <Grid
          style={{ gridTemplateColumns: "1.6fr 1fr 1fr" }}
          columns="3"
          gap="4"
          width="auto"
        >
          <Flex align="center">
            <Badge
              variant="soft"
              radius="full"
              style={{ width: "100%", padding: "3px 5px 3px 5px" }}
            >
              <Flex align="center" gap="2">
                <img
                  width={30}
                  height={30}
                  alt="name"
                  src={TOKENS.graph.img.tToken}
                ></img>
                <Text size="1">2.0000 tGRT</Text>
              </Flex>
            </Badge>
          </Flex>
          <Flex align="center" justify="end">
            <Badge
              variant="soft"
              radius="full"
              style={{ width: "100%", padding: "10px" }}
            >
              <CountdownTimerIcon />3 weeks left
            </Badge>
          </Flex>
          <Flex align="center" justify="end">
            <Button variant="surface">
              <CountdownTimerIcon />
              unstaking
            </Button>
          </Flex>
          <Flex style={{ gridColumn: "1 / span 3" }}>
            <Separator orientation="horizontal" size="4" />
          </Flex>
          <Flex align="center">
            <Badge
              variant="soft"
              radius="full"
              style={{ width: "100%", padding: "3px 5px 3px 5px" }}
            >
              <Flex align="center" gap="2">
                <img
                  width={30}
                  height={30}
                  alt="name"
                  src={TOKENS.matic.img.tToken}
                ></img>
                <Text size="1">2.0000 tMATIC</Text>
              </Flex>
            </Badge>
          </Flex>
          <Flex align="center" justify="end">
            <Badge
              variant="soft"
              radius="full"
              style={{ width: "100%", padding: "10px" }}
            >
              <CountdownTimerIcon />3 weeks left
            </Badge>
          </Flex>
          <Flex align="center" justify="end">
            <Button
              onClick={() => {
                // Todo: need to make it dynamic, id will be passed from the map items of unlocks
                const unlockID =
                  "0x4003e23be46f3bf2b50c3c7f8b13aaecdc71ea72000000000000000000000003";
                withdraw?.(unlockID);
              }}
              variant="solid"
            >
              <ClockIcon />
              Withdraw
            </Button>
          </Flex>
        </Grid>
      </Callout>
    </>
  );
};
