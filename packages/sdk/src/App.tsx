import { Flex } from "@radix-ui/themes";
import { Card, Tenderize } from "@lib/components";
import { ConnectKitButton } from "@lib/components";

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
      <Card size={"1"} className="w-[40%]">
        <Tenderize />
      </Card>
    </Flex>
  );
}

export default App;
