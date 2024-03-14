import { Button as ButtonRadix } from "@radix-ui/themes";
import type { ComponentProps, FC, ReactNode } from "react";

type ButtonRadixProps = ComponentProps<typeof ButtonRadix>;

export type ButtonProps = {
  children: ReactNode;
} & ButtonRadixProps;

export const Button: FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <ButtonRadix className="cursor-pointer" {...rest}>
      {children}
    </ButtonRadix>
  );
};
