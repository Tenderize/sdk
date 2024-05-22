import { Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  max: string;
  handleInputChange: (value: string) => void;
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
        className="cursor-pointer text-left"
        size={"1"}
        onClick={handleMaxButtonClick}
      >
        Max: {max}
      </Text>
    </Flex>
  );
};

export default MaxBalanceButton;