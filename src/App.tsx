import { Flex } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Tabs } from "./components/Tabs";
import { Card } from "./components/card";
import { ThemeProvider } from "./contexts";
import "./index.css";
import { Stake } from "./ui/Stake";

const TABS_DATA = [
  {
    name: "Stake",
    content: () => <Stake />,
    value: "stake",
  },
  {
    name: "Unstake",
    content: () => <Stake />, // TODO: replace with Unstake component
    value: "unstake",
  },
  {
    name: "Swap",
    content: () => <Stake />, // TODO: replace with Swap component
    value: "swap",
  },
];

function App() {
  return (
    <ThemeProvider>
      <Flex align="center" justify="center" height={"auto"}>
        <Card size={"1"} className="w-[40%]">
          <Tabs tabsData={TABS_DATA} />
        </Card>
      </Flex>
    </ThemeProvider>
  );
}

export default App;
