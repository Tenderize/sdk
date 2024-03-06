import { Flex } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Tabs } from "@/components/Tabs";
import { Card } from "@/components/Card";
import "@/index.css";
import { Stake, Swap, Unstake } from "@/ui/";

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
