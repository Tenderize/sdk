import { TextField } from "@radix-ui/themes";
import {
  ChangeEvent,
  ComponentProps,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

type TextFieldRadixProps = ComponentProps<
  typeof TextField.Root & typeof TextField.Input
>;
interface Props extends TextFieldRadixProps {
  placeholder?: string;
  icon?: ReactNode;
  value?: string;
  handleChange?: (event: string) => void;
}

export const InputNumber: FC<Props> = ({
  placeholder = "Enter amount",
  icon,
  value,
  handleChange,
  disabled,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState<string>(value || "");

  const handleInputOutsideChange = useCallback(
    (value: string) => {
      setInputValue(value);
      handleChange && handleChange(value);
    },
    [handleChange]
  );

  // Sync the input value with the parent value
  useEffect(() => {
    handleInputOutsideChange(value || "");
  }, [handleInputOutsideChange, value]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const numericValue = newValue.replace(/[^\d.]/g, "");
    if (/^\d*\.?\d*$/.test(numericValue)) {
      handleInputOutsideChange(numericValue);
    }
  };

  return (
    <TextField.Root {...rest}>
      {icon && <TextField.Slot>{icon}</TextField.Slot>}
      <TextField.Input
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        disabled={disabled}
        {...rest}
      />
    </TextField.Root>
  );
};
