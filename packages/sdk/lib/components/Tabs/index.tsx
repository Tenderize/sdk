import { Tabs as TabsRadix } from "@radix-ui/themes";
import type { ComponentProps, FC } from "react";

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
      <TabsRadix.List size="2" style={{ justifyContent: "space-around" }}>
        {tabsData.map((tab) => (
          <TabsRadix.Trigger key={tab.value} value={tab.value} style={{ fontSize: 20 }}>
            {tab.name}
          </TabsRadix.Trigger>
        ))}
      </TabsRadix.List>

      {tabsData.map((tab) => (
        <TabsRadix.Content value={tab.value} key={tab.value}>
          {tab.content()}
        </TabsRadix.Content>
      ))}
    </TabsRadix.Root>
  );
};
