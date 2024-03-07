import { Flex } from "@radix-ui/themes";
import { Tabs } from "@tenderize/sdk";
import { Card } from "@tenderize/sdk";
import { Stake, Swap, Unstake } from "@tenderize/sdk";

const TABS_DATA = [
  {
    name: "Stake",
    content: () => <Stake />,
    value: "stake",
  },
  {
    name: "Unstake",
    content: () => <Unstake />,
    value: "unstake",
  },
  {
    name: "Swap",
    content: () => <Swap />,
    value: "swap",
  },
];

function App() {
  return (
    <Flex
      style={{ height: "100vh" }}
      align="center"
      justify="center"
      height={"auto"}
    >
      <Card size={"1"} className="w-[40%]">
        <Tabs tabsData={TABS_DATA} />
      </Card>
    </Flex>
  );
}

export default App;
