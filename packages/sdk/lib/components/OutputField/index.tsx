import { TextField } from "@radix-ui/themes";
import {
  type CSSProperties,
  type ComponentProps,
  type FC,
  type ReactNode,
} from "react";

type TextFieldRadixProps = ComponentProps<
  typeof TextField.Root & typeof TextField.Input
>;
interface Props extends TextFieldRadixProps {
  placeholder?: string;
  icon?: ReactNode;
  value?: string;
  handleChange?: (event: string) => void;
  max?: string;
  style?: CSSProperties;
}

export const OutputField: FC<Props> = ({
  placeholder = "Enter amount",
  icon,
  value,
  style,
  ...rest
}) => {
  return (
    <TextField.Root {...rest} style={{ ...style, pointerEvents: "none" }}>
      <TextField.Input
        value={value}
        placeholder={placeholder}
        defaultValue={value}
        size={"3"}
        style={{ ...style }}
        {...rest}
      />
      {icon && <TextField.Slot>{icon}</TextField.Slot>}
    </TextField.Root>
  );
};
