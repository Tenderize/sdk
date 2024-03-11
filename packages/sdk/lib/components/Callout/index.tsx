import { Callout as CalloutRadix } from "@radix-ui/themes";

import type { CSSProperties, ComponentProps, FC, ReactNode } from "react";

type CardRadixProps = ComponentProps<typeof CalloutRadix.Root>;

interface Props extends CardRadixProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const Callout: FC<Props> = (props) => {
  const { children, style, ...rest } = props;
  return (
    <CalloutRadix.Root style={{ ...style }} {...rest}>
      {children}
    </CalloutRadix.Root>
  );
};
