import { TOKENS } from "@lib/constants";
import { useTokenStore } from "@lib/hooks";
import { type Token } from "@lib/types";
import {
  Button,
  DropdownMenu as DropdownMenuRadix,
  Text,
} from "@radix-ui/themes";
import React, { type FC, useState } from "react";

type DropdownMenuRadixProps = React.ComponentProps<
  typeof DropdownMenuRadix.Root &
  typeof DropdownMenuRadix.Content &
  typeof DropdownMenuRadix.Item &
  typeof DropdownMenuRadix.Trigger
>;

interface SelectedItem {
  Icon: FC;
  name: string;
}

export const TokenSelector: FC<DropdownMenuRadixProps> = () => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | undefined>();
  const { setSelectedToken } = useTokenStore();

  const tokensData = Object.values(TOKENS).map((token: Token) => {
    return {
      Icon: () => (
        <Text style={{ color: token.color }}>
          <img src={token.img.token} alt={token.name} />
        </Text>
      ),
      name: token.name,
      slug: token.slug,
    };
  });

  const { Icon, name } = selectedItem || {};

  return (
    <DropdownMenuRadix.Root>
      <DropdownMenuRadix.Trigger>
        <Button variant="outline">
          {Icon && <Icon />}
          <Text>{name || "Select Token"}</Text>
        </Button>
      </DropdownMenuRadix.Trigger>
      <DropdownMenuRadix.Content>
        {tokensData.map((item, index) => (
          <DropdownMenuRadix.Item
            onSelect={() => {
              setSelectedItem(item);
              setSelectedToken(item.slug);
            }}
            key={index}
          >
            {item.Icon && <item.Icon />}
            <Text>{item.name}</Text>
          </DropdownMenuRadix.Item>
        ))}
      </DropdownMenuRadix.Content>
    </DropdownMenuRadix.Root>
  );
};
