import { Box, Tabs as TabsRadix } from "@radix-ui/themes";
import { ComponentProps, FC } from "react";

type TextFieldRadixProps = ComponentProps<typeof TabsRadix.Root>;
interface Props extends TextFieldRadixProps {
  tabsData: {
    name: string;
    value: string;
    content: () => JSX.Element;
  }[];
}

export const Tabs: FC<Props> = (props) => {
  const { tabsData, ...rest } = props;

  return (
    <TabsRadix.Root {...rest} defaultValue={tabsData[0].value}>
      <TabsRadix.List>
        {tabsData.map((tab) => (
          <TabsRadix.Trigger key={tab.value} value={tab.value}>
            {tab.name}
          </TabsRadix.Trigger>
        ))}
      </TabsRadix.List>

      <Box px="4" pt="3" pb="2">
        {tabsData.map((tab) => (
          <TabsRadix.Content value={tab.value} key={tab.value}>
            <Box px="4" pt="3" pb="2" className="min-h-[200px]">
              {tab.content()}
            </Box>
          </TabsRadix.Content>
        ))}
      </Box>
    </TabsRadix.Root>
  );
};
