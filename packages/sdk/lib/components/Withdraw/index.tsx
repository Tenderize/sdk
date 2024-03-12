import { TOKENS } from "@lib/constants";
import { formatAddress } from "@lib/utils";
import { ClockIcon, CountdownTimerIcon } from "@radix-ui/react-icons";
import { Badge, Flex, Grid, Heading, Separator, Text } from "@radix-ui/themes";
import type { CSSProperties, FC } from "react";
import { Button, Callout } from "..";
import { AvatarWithAddress } from "../AvatarWithAddress";

interface WithdrawProps {
  style?: CSSProperties;
}

export const Withdraw: FC<WithdrawProps> = (props) => {
  const { style } = props;

  return (
    <>
      <Callout variant="surface" style={{ ...style }}>
        <Heading size="4">Your balance</Heading>
        <Separator orientation="horizontal" size="4" />
        <Grid
          style={{ gridTemplateColumns: "1.5fr 1fr 1fr" }}
          columns="3"
          gap="4"
          width="auto"
        >
          <Flex direction="column" gap="1">
            <Badge>
              <AvatarWithAddress
                fallback="0x..."
                address="0x1234234232422424"
                size="2"
                radius="full"
              />
              <Flex ml="2" direction="column" gap="1">
                <Text as="div" size="2">
                  {formatAddress("0x12342342324224242344242422")}
                </Text>
                <Flex align="start">
                  <img
                    width={20}
                    height={20}
                    alt="name"
                    src={TOKENS.graph.img.tToken}
                  ></img>
                  <Text size="1">2.0000 tGRT</Text>
                </Flex>
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
          <Flex direction="column" gap="1">
            <Badge>
              <AvatarWithAddress
                fallback="0x..."
                address="0x122342334234232342342422424"
                size="2"
                radius="full"
              />
              <Flex ml="2" direction="column" gap="1">
                <Text as="div" size="2">
                  {formatAddress("0x1223424342342324224242344242422")}
                </Text>
                <Flex align="start">
                  <img
                    width={20}
                    height={20}
                    alt="name"
                    src={TOKENS.matic.img.tToken}
                  ></img>
                  <Text size="1">2.0000 tGRT</Text>
                </Flex>
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
