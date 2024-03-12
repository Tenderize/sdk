import { Flex } from "@radix-ui/themes";
import { Card } from "@tenderize/sdk";
import { Tenderize } from "@tenderize/sdk";
import { ConnectKitButton } from "@tenderize/sdk";
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
