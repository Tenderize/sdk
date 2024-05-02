import { cn } from "@lib/utils";
import { Button as ButtonRadix } from "@radix-ui/themes";
import type { ComponentProps, FC, ReactNode } from "react";

type ButtonRadixProps = ComponentProps<typeof ButtonRadix>;

export type ButtonProps = {
  children: ReactNode;
} & ButtonRadixProps;

export const Button: FC<ButtonProps> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <ButtonRadix className={cn("cursor-pointer", className)} {...rest}>
      {children}
    </ButtonRadix>
  );
};
