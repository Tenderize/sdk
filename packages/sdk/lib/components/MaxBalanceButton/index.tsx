import { Flex, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { InputNumber } from "@lib/components/InputNumber";
import { type Address, formatEther, parseEther } from "viem";
import { useERC20Balance } from "@lib/hooks";
import type { Token } from "@lib/types";
import { useAccount } from "wagmi";
import { TOKENS, TOKEN_ADDRESSES, TokenSlugEnums } from "@lib/constants";

interface Props {
  tokenAddress: Address,
  handleInputChange: (value: bigint) => void;
}

export const MaxBalanceButton: React.FC<Props> = ({ tokenAddress, handleInputChange }) => {
  const [inputValue, setInputValue] = useState<string>("0");
  const { address: userAddress } = useAccount();
  const { chainId } = TOKENS[TOKEN_ADDRESSES[tokenAddress] as TokenSlugEnums] as Token;

  const { balance } = useERC20Balance(tokenAddress, userAddress, chainId);

  const handleMaxButtonClick = () => {
    handleInputChange(balance);
    setInputValue(formatEther(balance));
  };

  return (
    <Flex direction="column" gap="2">
      <InputNumber
        value={inputValue}
        variant="soft"
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
