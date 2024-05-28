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

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

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

const TenderizeRoute: FC = () => {
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

export function Tenderize() {
  const { activeTabs: activeTabsStore } = useTenderizeConfigStore();

  const activeRoutes = activeTabsStore.map((tab) => (
    <Route key={tab} path={tab} element={<TenderizeRoute />} />
  ));

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<TenderizeRoute />}>
        {activeRoutes}
      </Route>
    )
  );
  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center h-full pb-2">
        <RouterProvider router={router} />
      </div>
    </>
  );
}
export default Tenderize;
