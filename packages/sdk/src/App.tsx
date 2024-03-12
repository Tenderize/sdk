import { Flex } from "@radix-ui/themes";
import React from "react";
import { Card, ConnectKitButton, Tenderize } from "../lib/components";
function App() {
  return (
    <Flex
      style={{ height: "100vh" }}
      align="center"
      justify="center"
      height={"auto"}
      direction={"column"}
      gap={"4"}
    >
      <ConnectKitButton />
      <Card size={"1"} className="w-[40%]">
        <Tenderize />
      </Card>
    </Flex>
  );
}

export default App;
