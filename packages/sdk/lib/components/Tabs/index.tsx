import * as TabsRadix from "@radix-ui/react-tabs";
import type { ComponentProps, FC } from "react";
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

  return (
    <TabsRadix.Root {...rest} defaultValue={tabsData[0]?.value}>
      <TabsRadix.List className="justify-center bg-card rounded-lg items-center flex rounded-lg gap-0 py-2">
        {tabsData.map((tab) => (
          <TabsRadix.Trigger
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-5 text-xl
            text-primary-foreground data-[state=active]:text-primary  data-[state=active]:bg-background w-[32.5%] h-[20px]
          rounded-lg  cursor-pointer data-[state=active]:shadow-md hover:bg-transparent transition-all
          data-[state=active]:border border-transparent border-b-primary "
            key={tab.value}
            value={tab.value}
          >
            {tab.name}
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
