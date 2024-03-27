import { Flex, Tabs as TabsRadix } from "@radix-ui/themes";
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
      <TabsRadix.List size="2" style={{ justifyContent: "space-around" }}>
        {tabsData.map((tab) => (
          <TabsRadix.Trigger
            key={tab.value}
            value={tab.value}
            style={{ fontSize: 20 }}
          >
            <NavLink to={tab.value}>{tab.name}</NavLink>
          </TabsRadix.Trigger>
        ))}
      </TabsRadix.List>

      {tabsData.map((tab) => (
        <TabsRadix.Content value={tab.value} key={tab.value}>
          <Flex direction="column" gap="2" my="2">
            <BalanceCard />
          </Flex>
          {tab.content()}
        </TabsRadix.Content>
      ))}
    </TabsRadix.Root>
  );
};
