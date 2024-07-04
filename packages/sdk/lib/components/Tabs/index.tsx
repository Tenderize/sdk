import * as TabsRadix from "@radix-ui/react-tabs";
import type { ComponentProps, FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BalanceCard } from "..";

type TextFieldRadixProps = ComponentProps<typeof TabsRadix.Root>;
interface Props extends TextFieldRadixProps {
  tabsData: Array<{
    name: string;
    value: string;
    content: () => JSX.Element;
  }>;
}

export const Tabs: FC<Props> = (props) => {
  const { tabsData, ...rest } = props;
  const location = useLocation();

  const activeTab =
    tabsData.find((tab) => tab.value === location?.pathname?.split("/")[1])
      ?.value || "stake";
  return (
    <TabsRadix.Root {...rest} defaultValue={activeTab}>
      <TabsRadix.List
        style={{
          display: "flex",
          justifyContent: tabsData.length === 1 ? "start" : "center",
        }}
      >
        {tabsData.map((tab) => (
          <TabsRadix.Trigger
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-5 text-xl
            text-primary-foreground data-[state=active]:text-primary  data-[state=active]:bg-background w-[32.5%] h-[20px]
          rounded-lg  cursor-pointer data-[state=active]:shadow-md hover:bg-transparent transition-all
          data-[state=active]:border border-transparent border-b-primary "
            key={tab.value}
            value={tab.value}
          >
            <NavLink to={tab.value}>{tab.name}</NavLink>
          </TabsRadix.Trigger>
        ))}
      </TabsRadix.List>

      {tabsData.map((tab) => (
        <TabsRadix.Content value={tab.value} key={tab.value}>
          <div className="flex flex-col gap-2 my-2">
            <BalanceCard />
          </div>

          {tab.content()}
        </TabsRadix.Content>
      ))}
    </TabsRadix.Root>
  );
};
