import { OutputField } from "@lib/components/OutputField";
import { TokenSlugEnums } from "@lib/constants";
import { useERC20Balance, useSelectedToken } from "@lib/hooks";
import { Flex, Text } from "@radix-ui/themes";
import { getChainId } from "@wagmi/core";
import React, { useState } from "react";
import { formatEther, parseEther, type Address } from "viem";
import { useAccount, useConfig } from "wagmi";
import { TokenSelector } from "..";

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
  const wagmiConfig = useConfig();
  const chainId = getChainId(wagmiConfig);
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
