import { Button as ButtonRadix } from "@radix-ui/themes";
import type { ComponentProps, FC, ReactNode } from "react";

type ButtonRadixProps = ComponentProps<typeof ButtonRadix>;

export type ButtonProps = {
  children: ReactNode;
  isLoading?: boolean;
} & ButtonRadixProps;

export const Button: FC<ButtonProps> = (props) => {
  const { children, isLoading, ...rest } = props;
  return (
    <ButtonRadix className="cursor-pointer" {...rest}>
      {/*  Todo: find a way to sync loader colors with radix theme, create a seprate loader */}
      {isLoading && (
        <div className="inset-0 flex items-center justify-center">
          <div className="w-3 h-3 border-t-2 border-b-2 border-green-700 rounded-full animate-spin"></div>
        </div>
      )}
      {!isLoading ? children : "Please wait..."}
    </ButtonRadix>
  );
};
