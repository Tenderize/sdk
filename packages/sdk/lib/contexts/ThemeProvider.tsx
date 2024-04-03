import { applyColorsToRoot } from "@lib/utils";
import { Theme } from "@radix-ui/themes";
import type { ComponentProps, FC, ReactNode } from "react";

export type ThemeProviderProps = ComponentProps<typeof Theme>;

interface Props {
  children: ReactNode;
  theme?: ThemeProviderProps;
}

const colors = {
  lightMode: {
    border: "#e2e8f0",
    primary: {
      DEFAULT: "#38bdf8",
    },
    secondary: {
      DEFAULT: "#9ca3af",
    },
    destructive: {
      DEFAULT: "#6b7280",
    },
    callout: {
      DEFAULT: "#f0f9ff",
      soft: "#f0f9ff",
      foreground: "#0284c7",
    },
  },
};

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
console.log("isDarkMode", isDarkMode);
applyColorsToRoot(colors.lightMode);

export const ThemeProvider: FC<Props> = ({ children, theme }) => {
  const mergedTheme: ThemeProviderProps = { ...theme };
  return <Theme {...mergedTheme}>{children}</Theme>;
};
