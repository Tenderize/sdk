import { useTenderizeConfigStore } from "@lib/config/store";
import { ActionEnums, TOKENS, TokenSlugEnums } from "@lib/constants";
import { useSelectedToken, useSelectedTokenStore } from "@lib/contexts";

import type { Token } from "@lib/types";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  DropdownMenu as DropdownMenuRadix,
  Flex,
  Text,
} from "@radix-ui/themes";
import React, { useEffect, type FC } from "react";

type DropdownMenuRadixProps = React.ComponentProps<
  typeof DropdownMenuRadix.Root &
    typeof DropdownMenuRadix.Content &
    typeof DropdownMenuRadix.Item &
    typeof DropdownMenuRadix.Trigger
>;

interface TokenSelectorProps extends DropdownMenuRadixProps {
  action?: ActionEnums;
  defaultValue?: TokenSlugEnums;
}

export const TokenSelector: FC<TokenSelectorProps> = (props) => {
  const { action = ActionEnums.STAKE, defaultValue } = props;
  const { setSelectedToken } = useSelectedTokenStore();
  const selectedToken = useSelectedToken();

  const { tokens } = useTenderizeConfigStore();

  const isWrappedToken = (action: ActionEnums) => {
    return action !== ActionEnums.STAKE;
  };

  useEffect(() => {
    if (defaultValue) setSelectedToken(defaultValue);
  }, [defaultValue, setSelectedToken]);

  const Icon: FC<{ action: ActionEnums; selectedToken: Token }> = ({
    action,
    selectedToken,
  }) => (
    <img
      width={isWrappedToken(action) ? 30 : 25}
      height={isWrappedToken(action) ? 30 : 25}
      src={
        isWrappedToken(action)
          ? selectedToken?.img.tToken
          : selectedToken?.img.token
      }
      alt={selectedToken?.name}
    />
  );

  const tokensData = tokens.map((t) => {
    const item = t as TokenSlugEnums;
    return {
      Icon: () => <Icon action={action} selectedToken={TOKENS[item]} />,
      name: isWrappedToken(action)
        ? `t${TOKENS[t as TokenSlugEnums].currency}`
        : TOKENS[t as TokenSlugEnums].currency,
      slug: t as TokenSlugEnums,
    };
  });

  const selectedTokenData = tokensData.find(
    (data) => data.slug === selectedToken.slug
  );

  return (
    <DropdownMenuRadix.Root>
      <DropdownMenuRadix.Trigger>
        <Button variant="soft" size={"3"} style={{ padding: 0 }}>
          <Flex gap="2" align="center" justify={"between"}>
            {!!selectedTokenData?.Icon && <selectedTokenData.Icon />}
            <Text>{selectedTokenData?.name || "Select Token"}</Text>
            <ChevronDownIcon />
          </Flex>
        </Button>
      </DropdownMenuRadix.Trigger>
      <DropdownMenuRadix.Content>
        <Flex direction="column" gap="4">
          {tokensData.map((item, index) => (
            <DropdownMenuRadix.Item
              style={{
                ...(selectedToken?.slug === item.slug && { opacity: 0.5 }),
              }}
              onSelect={() => {
                setSelectedToken(item.slug);
              }}
              key={index}
            >
              <Box position={"relative"}>
                <Flex gap="4" align="center" justify={"between"}>
                  {item.Icon && <item.Icon />}
                  <Flex gap="1" align={"center"}>
                    <Text>{item?.name}</Text>
                    {selectedToken.slug === item.slug && <CheckIcon />}
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
