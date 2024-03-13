import { Flex, Text } from "@radix-ui/themes";
import React from "react";
import { formatEther } from "viem";

interface Props {
  max: bigint;
  handleInputChange: (value: bigint) => void;
}

export const MaxBalanceButton: React.FC<Props> = ({
  handleInputChange,
  max,
}) => {
  const handleMaxButtonClick = () => {
    handleInputChange(max);
  };

  return (
    <Flex direction="column" gap="2">
      <Text
        style={{ width: "max-content" }}
        className="cursor-pointer text-left"
        size={"1"}
        onClick={handleMaxButtonClick}
      >
        Max: {formatEther(max)}
      </Text>
    </Flex>
  );
};

export default MaxBalanceButton;
