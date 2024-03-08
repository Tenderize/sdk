import { OutputField } from "@lib/components/OutputField";
import { TOKENS, TOKEN_ADDRESSES, TokenSlugEnums } from "@lib/constants";
import { useERC20Balance } from "@lib/hooks";
import type { Token } from "@lib/types";
import { Flex, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { formatEther, parseEther, type Address } from "viem";
import { useAccount } from "wagmi";

interface Props {
  tokenAddress: Address;
  handleInputChange: (value: bigint) => void;
}

export const MaxBalanceButton: React.FC<Props> = ({
  tokenAddress,
  handleInputChange,
}) => {
  const [inputValue, setInputValue] = useState<string>("0");
  const { address: userAddress } = useAccount();
  const { chainId } = TOKENS[
    TOKEN_ADDRESSES[tokenAddress] as TokenSlugEnums
  ] as Token;

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
        max={formatEther(balance ?? 0n)}
        handleChange={(value: string) => {
          setInputValue(value);
          handleInputChange(parseEther(value));
        }}
      />
      <Text
        className="cursor-pointer text-right"
        size={"1"}
        onClick={handleMaxButtonClick}
      >
        Max: {formatEther(balance)}
      </Text>
    </Flex>
  );
};

export default MaxBalanceButton;
