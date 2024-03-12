import { OutputField } from "@lib/components/OutputField";
import { ActionEnums } from "@lib/constants";
import { useERC20Balance } from "@lib/hooks";
import { Flex, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { formatEther, parseEther, type Address } from "viem";
import { useAccount } from "wagmi";
import { TokenSelector } from "..";
import { useSelectedToken } from "@lib/contexts";
import { useChainId } from "@lib/config/store";

interface Props {
  action?: ActionEnums;
  tokenAddress: Address;
  handleInputChange: (value: bigint) => void;
}

export const MaxBalanceButton: React.FC<Props> = ({
  action,
  tokenAddress,
  handleInputChange,
}) => {
  const [inputValue, setInputValue] = useState<string>("0");
  const { address: userAddress } = useAccount();
  const token = useSelectedToken();
  const chainId = useChainId(token.slug);

  const { balance } = useERC20Balance(tokenAddress, userAddress, chainId);

  const handleMaxButtonClick = () => {
    handleInputChange(balance);
    setInputValue(formatEther(balance));
  };

  return (
    <Flex direction="column" gap="2">
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
