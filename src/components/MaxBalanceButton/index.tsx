import { Flex, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { InputNumber } from "@/components/InputNumber";
import { Address, formatEther, parseEther } from "viem";
import { useERC20Balance } from "@/hooks/erc20";
import { useSelectedToken } from "@/hooks/selectedToken";
import type { Token } from "@/types";
import { useAccount } from "wagmi";

interface Props {
  tokenAddress: Address,
  handleInputChange: (value: bigint) => void;
}

export const MaxButton: React.FC<Props> = ({ tokenAddress, handleInputChange }) => {
  const [inputValue, setInputValue] = useState<string>("0");
  const { address: userAddress } = useAccount();
  const { token } = useSelectedToken();

  const { balance, isLoading } = useERC20Balance(tokenAddress, userAddress, token.chainId);

  const handleMaxButtonClick = () => {
    handleInputChange(balance);
    setInputValue(formatEther(balance));
  };

  return (
    <Flex direction="column" gap="2">
      <InputNumber
        value={inputValue}
        variant="soft"
        handleChange={(value) => {
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

export default MaxButton;
