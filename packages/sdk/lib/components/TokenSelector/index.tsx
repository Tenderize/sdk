import { TOKENS, TokenSlugEnums } from "@lib/constants";
import { useTokenStore } from "@lib/hooks";
import { type Token } from "@lib/types";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  DropdownMenu as DropdownMenuRadix,
  Flex,
  Text,
} from "@radix-ui/themes";
import React, { useEffect, useState, type FC } from "react";

type DropdownMenuRadixProps = React.ComponentProps<
  typeof DropdownMenuRadix.Root &
    typeof DropdownMenuRadix.Content &
    typeof DropdownMenuRadix.Item &
    typeof DropdownMenuRadix.Trigger
>;
type SelectedItem = {
  Icon: FC;
  name: string;
};
interface TokenSelectorProps extends DropdownMenuRadixProps {
  defaultValue?: TokenSlugEnums;
  method?: "stake" | "unstake";
}

export const TokenSelector: FC<TokenSelectorProps> = (props) => {
  const { defaultValue, method } = props;

  const findDefaultItem = Object.values(TOKENS).find(
    (token) => token.slug === defaultValue
  );
  const width = method === "unstake" ? 30 : 25;
  const height = method === "unstake" ? 30 : 25;

  useEffect(() => {
    if (findDefaultItem) {
      setSelectedItem({
        Icon: () => (
          <img
            width={width}
            height={height}
            src={
              method === "unstake"
                ? findDefaultItem.img.tToken
                : findDefaultItem.img.token
            }
            alt={findDefaultItem.name}
          />
        ),
        name:
          method === "unstake"
            ? `t${findDefaultItem.currency}`
            : findDefaultItem.currency,
      });
    }
  }, [findDefaultItem, height, method, width]);

  const { setSelectedToken } = useTokenStore();
  const [selectedItem, setSelectedItem] = useState<SelectedItem | undefined>();

  const tokensData = Object.values(TOKENS).map((token: Token) => {
    return {
      Icon: () => (
        <img
          width={width}
          height={height}
          src={method === "unstake" ? token.img.tToken : token.img.token}
          alt={token.name}
        />
      ),
      name: method === "unstake" ? `t${token.currency}` : token.currency,
      slug: token.slug,
    };
  });

  const { Icon, name } = selectedItem || {};

  return (
    <DropdownMenuRadix.Root>
      <DropdownMenuRadix.Trigger>
        <Button variant="ghost" size={"3"} style={{ padding: 0 }}>
          <Flex gap="2" align="center" justify={"between"}>
            {!!Icon && <Icon />}
            <Text>{name || "Select Token"}</Text>
            <ChevronDownIcon />
          </Flex>
        </Button>
      </DropdownMenuRadix.Trigger>
      <DropdownMenuRadix.Content>
        <Flex direction="column" gap="4">
          {tokensData.map((item, index) => (
            <DropdownMenuRadix.Item
              style={{
                ...(selectedItem?.name === item.name && { opacity: 0.5 }),
              }}
              onSelect={() => {
                setSelectedItem(item);
                setSelectedToken(item.slug);
              }}
              key={index}
            >
              <Box position={"relative"}>
                <Flex gap="4" align="center" justify={"between"}>
                  {item.Icon && <item.Icon />}
                  <Flex gap="1" align={"center"}>
                    <Text>{item.name}</Text>
                    {selectedItem?.name === item.name && <CheckIcon />}
                  </Flex>
                </Flex>
              </Box>
            </DropdownMenuRadix.Item>
          ))}
        </Flex>
      </DropdownMenuRadix.Content>
    </DropdownMenuRadix.Root>
  );
};
