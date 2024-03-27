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
      style={{ height: "max-content" }}
    >
      <Box
        style={{
          left: "50%",
          right: "50%",
          top: "46%",
          transform: "translate(-50%, -50%)",
          width: "max-content",
          borderRadius: "10px",
          border: "8px solid #fff",
        }}
        position={"absolute"}
      >
        <IconButton variant="surface">
          <ArrowDownIcon width="20" height="20" />
        </IconButton>
      </Box>
      <Flex direction="column" gap="2">
        <Callout className="flex px-3" variant="soft">
          {callOutFirstChildren}
        </Callout>
        <Callout className="flex px-3" variant="soft">
          {callOutSecondChildren}
        </Callout>
        <Flex width={"100%"} justify="center">
          {callOutActionChildren}
        </Flex>
      </Flex>
    </Container>
  );
};
