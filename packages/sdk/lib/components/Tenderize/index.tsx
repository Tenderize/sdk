import { Stake, Swap, Unstake } from "@lib/components";
import { Tabs } from "@lib/components";
import { FC } from "react";

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
    return <Tabs tabsData={TABS_DATA} />;
};

export default Tenderize