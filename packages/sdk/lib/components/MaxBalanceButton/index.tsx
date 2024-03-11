import { OutputField } from "@lib/components/OutputField";
import { TOKENS, TokenSlugEnums } from "@lib/constants";
import { useERC20Balance, useSelectedToken } from "@lib/hooks";
import type { Token } from "@lib/types";
import { Flex, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { formatEther, parseEther, type Address } from "viem";
import { useAccount } from "wagmi";
import { TokenSelector } from "..";

interface Props {
  tokenAddress: Address;
  handleInputChange: (value: bigint) => void;
  method?: "stake" | "unstake";
  tokenSlug: TokenSlugEnums;
}

export const MaxBalanceButton: React.FC<Props> = ({
  tokenAddress,
  handleInputChange,
  tokenSlug,
  method,
}) => {
  const [inputValue, setInputValue] = useState<string>("0");
  const { address: userAddress } = useAccount();
  const { chainId } = TOKENS[tokenSlug] as Token;
  const { token } = useSelectedToken();

  const { balance } = useERC20Balance(tokenAddress, userAddress, chainId);

  const handleMaxButtonClick = () => {
    handleInputChange(balance);
    setInputValue(formatEther(balance));
  };

  return (
    <Flex direction="column" gap="2">
      <OutputField
        value={inputValue}
        variant="soft"
        style={{ width: "100%", fontSize: 30 }}
        max={formatEther(balance ?? 0n)}
        handleChange={(value: string) => {
          setInputValue(value);
          handleInputChange(parseEther(value));
        }}
        icon={
          <TokenSelector
            method={method}
            defaultValue={
              TokenSlugEnums[
                token.slug.toUpperCase() as keyof typeof TokenSlugEnums
              ]
            }
          />
        }
      />
      <Text
        className="cursor-pointer text-left"
        size={"1"}
        onClick={handleMaxButtonClick}
      >
        Max: {formatEther(balance)}
      </Text>
    </Flex>
  );
};

export default MaxBalanceButton;
