import { Theme } from "@radix-ui/themes";
import type { ComponentProps, FC, ReactNode } from "react";

export type ThemeProviderProps = ComponentProps<typeof Theme>;

interface Props {
  children: ReactNode;
  theme?: ThemeProviderProps;
}

const defaultTheme: ThemeProviderProps = {
  accentColor: "blue",
  grayColor: "olive",
  panelBackground: "solid",
  scaling: "100%",
  radius: "large",
};

export const ThemeProvider: FC<Props> = ({ children, theme }) => {
  const mergedTheme: ThemeProviderProps = { ...defaultTheme, ...theme };
  return <Theme {...mergedTheme}>{children}</Theme>;
};
