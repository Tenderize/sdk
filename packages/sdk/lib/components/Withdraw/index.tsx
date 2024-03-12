import { TOKENS } from "@lib/constants";
import { ClockIcon, CountdownTimerIcon } from "@radix-ui/react-icons";
import { Badge, Flex, Grid, Heading, Separator, Text } from "@radix-ui/themes";
import type { CSSProperties, FC } from "react";
import { Button, Callout } from "..";

interface WithdrawProps {
  style?: CSSProperties;
}

// Todo: Everything is for static hardcoded data, need to make it dynamic

export const Withdraw: FC<WithdrawProps> = (props) => {
  const { style } = props;

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
            <Button variant="solid">
              <ClockIcon />
              Withdraw
            </Button>
          </Flex>
        </Grid>
      </Callout>
    </>
  );
};
