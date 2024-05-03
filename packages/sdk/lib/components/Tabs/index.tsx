import { Tabs as TabsRadix } from "@radix-ui/themes";
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
      <TabsRadix.List className="justify-around bg-background">
        {tabsData.map((tab) => (
          <TabsRadix.Trigger
            className="text-xl text-primary-foreground data-[state=active]:before:text-primary data-[state=active]:before:bg-primary "
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
