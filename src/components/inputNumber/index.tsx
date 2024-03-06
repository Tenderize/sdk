import { TextField } from "@radix-ui/themes";
import { ChangeEvent, ComponentProps, FC, ReactNode, useState } from "react";

type TextFieldRadixProps = ComponentProps<typeof TextField.Root>;
interface CustomTextFieldProps extends TextFieldRadixProps {
  placeholder?: string;
  icon?: ReactNode;
  value?: string;
  handleChange?: (event: string) => void;
}

export const InputNumber: FC<CustomTextFieldProps> = ({
  placeholder = "Enter amount",
  icon,
  value,
  handleChange,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState<string>(value || "");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const numericValue = newValue.replace(/[^\d.]/g, "");
    if (handleChange && /^\d*\.?\d*$/.test(numericValue)) {
      setInputValue(numericValue);
      handleChange(numericValue);
    }
  };

  return (
    <TextField.Root {...rest}>
      {icon && <TextField.Slot>{icon}</TextField.Slot>}
      <TextField.Input
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
    </TextField.Root>
  );
};
