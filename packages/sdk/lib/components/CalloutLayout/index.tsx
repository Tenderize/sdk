import { ArrowDownIcon } from "@radix-ui/react-icons";
import { Box, Container, Flex, IconButton } from "@radix-ui/themes";
import type { FC } from "react";
import { Callout } from "../Callout";

interface CalloutlayoutProps {
  callOutFirstChildren: React.ReactNode;
  callOutSecondChildren: React.ReactNode;
  callOutActionChildren: React.ReactNode;
}

export const CalloutLayout: FC<CalloutlayoutProps> = (props) => {
  const { callOutFirstChildren, callOutSecondChildren, callOutActionChildren } =
    props;
  return (
    <Container
      color="gray"
      width={"100%"}
      position="relative"
      style={{ minWidth: 400, height: "max-content" }}
    >
      <Box
        style={{
          left: "47%",
          right: "50%",
          top: "43%",
          transform: "translate(-50%, -50%)",
        }}
        position={"absolute"}
      >
        <IconButton variant="surface">
          <ArrowDownIcon width="20" height="20" />
        </IconButton>
      </Box>
      <Flex direction="column" gap="2">
        <Callout style={{ display: "flex" }} variant="soft">
          {callOutFirstChildren}
        </Callout>
        <Callout style={{ display: "flex" }} variant="soft">
          {callOutSecondChildren}
        </Callout>
        <Flex width={"100%"} justify="center">
          {callOutActionChildren}
        </Flex>
      </Flex>
    </Container>
  );
};
