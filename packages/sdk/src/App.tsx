import { Flex } from "@radix-ui/themes";
import { Tenderize } from "@lib/components";
import { ConnectKitButton } from "connectkit";

function App() {
  return (
    <Flex
      gap="4"
      direction="column"
      style={{ height: "100vh" }}
      align="center"
      justify="center"
      height={"auto"}
    >
      <ConnectKitButton />
      <Tenderize />
    </Flex>
  );
}

export default App;
