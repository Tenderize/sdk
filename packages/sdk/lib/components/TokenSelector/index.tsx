import {
  useChainId,
  useTenderizeConfigStore,
  useTenderizer,
  useTokenMetadata,
} from "@lib/config/store";
import { ActionEnums, TOKENS, TokenSlugEnums } from "@lib/constants";
import { useSelectedToken, useSelectedTokenStore } from "@lib/contexts";

import type { Token } from "@lib/types";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu as DropdownMenuRadix } from "@radix-ui/themes";

import { useTenderizerData } from "@lib/hooks";
import { getDefaultToken } from "@lib/utils";
import React, { useEffect, type FC } from "react";
import { TokenAvatar } from "../TokenAvatar";

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
  const { action = ActionEnums.STAKE } = props;
  const { setSelectedToken } = useSelectedTokenStore();
  const selectedToken = useSelectedToken();
  const { tokens } = useTenderizeConfigStore();
  const tenderizer = useTenderizer(selectedToken.slug);
  const tokenMetaData = useTokenMetadata();
  const chainId = useChainId(selectedToken.slug);
  const { data: tenderizerData } = useTenderizerData(tenderizer, chainId);
  const defaultToken = getDefaultToken(tokens);

  const isWrappedToken = (action: ActionEnums) => {
    return action !== ActionEnums.STAKE;
  };

  useEffect(() => {
    if (defaultToken) setSelectedToken(defaultToken);
  }, [defaultToken, setSelectedToken]);

  const Icon: FC<{
    action: ActionEnums;
    selectedToken: Token;
    slug: TokenSlugEnums;
  }> = ({ action, selectedToken, slug }) => {
    return isWrappedToken(action) ? (
      <TokenAvatar
        key={selectedToken.slug}
        defaultUrl={selectedToken.img?.tToken}
        size={25}
        imgUrl={tokenMetaData?.[slug]?.avatar}
        address={tenderizerData.validator}
      />
    ) : (
      <img
        width={25}
        height={25}
        src={selectedToken?.img.token}
        alt={selectedToken?.name}
      />
    );
  };

  const tokensData = tokens.map((t) => {
    const item = t as TokenSlugEnums;
    return {
      Icon: () => (
        <Icon action={action} selectedToken={TOKENS[item]} slug={item} />
      ),
      name: isWrappedToken(action)
        ? tokenMetaData?.[item]?.name || `t${TOKENS[item].currency}`
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
        <Button
          style={{ width: "max-content" }}
          className={
            "focus:outline-none min-w-[105px] bg-primary-100 hover:bg-primary-200 text-primary-foreground p-1 cursor-pointer"
          }
          variant="soft"
          size={"3"}
        >
          <div
            style={{ width: "max-content" }}
            className="gap-2 justify-start items-center flex min-w-[105px] max-w-full"
          >
            {!!selectedTokenData?.Icon && <selectedTokenData.Icon />}
            <span className="text-primary-foreground">
              {selectedTokenData?.name || "Select Token"}
            </span>
            <ChevronDownIcon className="text-primary-foreground" />
          </div>
        </Button>
      </DropdownMenuRadix.Trigger>
      <DropdownMenuRadix.Content>
        <div className="flex flex-col gap-2">
          {tokensData.map((item, index) => {
            return (
              <DropdownMenuRadix.Item
                className="bg-transparent hover:bg-primary-300 cursor-pointer"
                style={{
                  ...(selectedToken?.slug === item.slug && { opacity: 0.5 }),
                }}
                onSelect={() => {
                  setSelectedToken(item.slug);
                }}
                key={index}
              >
                <div className="relative">
                  <div className="gap-4 items-center justify-between flex">
                    {item.Icon && <item.Icon />}
                    <div className="gap-1 items-center flex">
                      <span className="text-primary-foreground">
                        {item?.name}
                      </span>
                      {selectedToken.slug === item.slug && <CheckIcon />}
                    </div>
                  </div>
                </div>
              </DropdownMenuRadix.Item>
            );
          })}
        </div>
      </DropdownMenuRadix.Content>
    </DropdownMenuRadix.Root>
  );
};
