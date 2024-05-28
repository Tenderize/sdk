import {
  Card,
  Stake,
  Swap,
  Tabs,
  TenderizerStats,
  Unstake,
} from "@lib/components";
import { useTenderizeConfigStore } from "@lib/config/store";
import type { TabEnum } from "@lib/hooks";
import { type FC } from "react";

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

export const Tenderize: FC = () => {
  const { activeTabs: activeTabsStore } = useTenderizeConfigStore();
  return (
    <div className="w-[95%] md:w-[650px] lg:w-[650px] pt-4 ">
      <div className="w-full mb-4">
        <TenderizerStats />
      </div>
      <Card
        size={"1"}
        className="w-[95%] md:w-[650px] lg:w-[650px] border border-border"
      >
        <Tabs
          tabsData={TABS_DATA.filter((tabData) =>
            activeTabsStore.includes(tabData.value as TabEnum)
          )}
        />
      </Card>
    </div>
  );
};

export default Tenderize;
