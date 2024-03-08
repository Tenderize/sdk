import { Flex } from "@radix-ui/themes";
import { Card } from "@tenderize/sdk";
import { Tenderize } from "@tenderize/sdk";

function App() {
  return (
    <Flex
      style={{ height: "100vh" }}
      align="center"
      justify="center"
      height={"auto"}
    >
      <Card size={"1"} className="w-[40%]">
        <Tenderize />
      </Card>
    </Flex>
  );
}

export default App;
