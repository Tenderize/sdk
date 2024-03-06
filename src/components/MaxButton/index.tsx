import { Flex, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { InputNumber } from "../inputNumber";

interface Props {
  maxValue: string;
  handleInputChange: (value: string) => void;
}

export const MaxButton: React.FC<Props> = (props) => {
  const { maxValue, handleInputChange } = props;
  const [maxValueState, setMaxValueState] = useState(maxValue);

  const handleMaxButtonClick = () => {
    setMaxValueState(maxValue);
  };

  return (
    <Flex direction="column" gap="2">
      <InputNumber
        value={maxValueState}
        variant="soft"
        handleChange={(value) => {
          setMaxValueState(value);
          handleInputChange(value);
        }}
      />
      <Text
        className="cursor-pointer text-right"
        size={"1"}
        onClick={handleMaxButtonClick}
      >
        Max: {maxValue}
      </Text>
    </Flex>
  );
};

export default MaxButton;
