import { cn } from "@lib/utils";
import { Button as ButtonRadix } from "@radix-ui/themes";
import type { ComponentProps, FC, ReactNode } from "react";

type ButtonRadixProps = ComponentProps<typeof ButtonRadix>;
export type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
} & ButtonRadixProps;

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    disabled,
    primary,
    secondary,
    success,
    ...rest
  } = props;
  // Define classes based on props
  const buttonClasses = cn("cursor-pointer", className, {
    "bg-primary": primary,
    "text-primary-accent": primary,
    "bg-secondary": secondary,
    "text-secondary-accent": secondary,
    "bg-success": success,
    "text-success-foreground": success,
    "bg-disabled": disabled,
    "text-disabled-foreground": disabled,
    "cursor-not-allowed": disabled || success,
  });
  return (
    <ButtonRadix className={cn(buttonClasses)} disabled={disabled} {...rest}>
      {children}
    </ButtonRadix>
  );
};
