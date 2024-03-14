import {
  Card,
  Stake,
  Swap,
  Tabs,
  TenderizerStats,
  Unstake,
} from "@lib/components";
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
  return (
    <>
      <Card size={"1"} className="w-full max-w-[50%]">
        <Tabs tabsData={TABS_DATA} />
      </Card>
      <div className="w-full max-w-[50%]">
        <TenderizerStats />
      </div>
    </>
  );
};

export default Tenderize;
