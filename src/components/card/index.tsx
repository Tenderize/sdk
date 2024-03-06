import { Card as CardRadix } from "@radix-ui/themes";
import { CSSProperties, ComponentProps, FC, ReactNode } from "react";

type CardRadixProps = ComponentProps<typeof CardRadix>;

interface Props extends CardRadixProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const Card: FC<Props> = (props) => {
  const { children, style, ...rest } = props;
  return (
    <CardRadix {...rest} style={{ ...style }}>
      {children}
    </CardRadix>
  );
};
