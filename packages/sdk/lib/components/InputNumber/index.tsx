import { TextField } from "@radix-ui/themes";
import {
  ChangeEvent,
  ComponentProps,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { parseEther } from "viem";

type TextFieldRadixProps = ComponentProps<
  typeof TextField.Root & typeof TextField.Input
>;
interface Props extends TextFieldRadixProps {
  placeholder?: string;
  icon?: ReactNode;
  value?: string;
  handleChange?: (event: string) => void;
  max?: string;
}

export const InputNumber: FC<Props> = ({
  placeholder = "Enter amount",
  icon,
  value,
  handleChange,
  disabled,
  max,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState<string>(value || "");
  const prevValueRef = useRef<string | undefined>(undefined);

  const handleInputOutsideChange = useCallback(
    (value: string) => {
      setInputValue(value);
      handleChange && handleChange(value);
    },
    [handleChange]
  );

  useEffect(() => {
    // Compare the current and previous values
    if (value !== prevValueRef.current) {
      handleInputOutsideChange(value || "");
      prevValueRef.current = value;
    }
  }, [value, handleInputOutsideChange]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const numericValue = newValue.replace(/[^\d.]/g, "");
    let finalValue = numericValue;
    const parsedNumericValue = parseEther(numericValue);
    const maxParsed = parseEther(max || "0");
    if (max && parsedNumericValue >= maxParsed) {
      // If input value exceeds the maximum, set it to the maximum allowed value
      finalValue = max;
    }

    if (/^\d*\.?\d*$/.test(finalValue)) {
      handleInputOutsideChange(finalValue);
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
