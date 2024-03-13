import { TextField } from "@radix-ui/themes";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type ComponentProps,
  type FC,
  type ReactNode,
} from "react";
import { formatEther, parseEther } from "viem";

type TextFieldRadixProps = ComponentProps<
  typeof TextField.Root & typeof TextField.Input
>;
interface Props extends Omit<TextFieldRadixProps, "value" | "max"> {
  placeholder?: string;
  icon?: ReactNode;
  value?: bigint;
  handleChange?: (event: bigint) => void;
  max?: bigint;
  style?: CSSProperties;
}

export const InputField: FC<Props> = ({
  placeholder = "Enter amount",
  icon,
  value = 0n,
  handleChange,
  max = 0n,
  style,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState<string>(formatEther(value) || "");
  const prevValueRef = useRef<bigint | undefined>(undefined);

  const handleInputOutsideChange = useCallback(
    (value: bigint) => {
      setInputValue(formatEther(value));
      handleChange && handleChange(value);
    },
    [handleChange]
  );

  useEffect(() => {
    // Compare the current and previous values
    if (value !== prevValueRef.current) {
      handleInputOutsideChange(value);
      prevValueRef.current = value;
    }
  }, [value, handleInputOutsideChange]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const numericValue = newValue.replace(/[^\d.]/g, "");
    const parsedNumericValue = parseEther(numericValue);

    const finalValue = max && parsedNumericValue >= max ? max : parsedNumericValue;

    handleInputOutsideChange(finalValue);

  };

  return (
    <TextField.Root {...rest} style={{ ...style }}>
      <TextField.Input
        max={formatEther(max)}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        size={"3"}
        style={{ ...style }}
        {...rest}
      />
      {icon && <TextField.Slot>{icon}</TextField.Slot>}
    </TextField.Root>
  );
};
