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
    border: "#eee",
    primary: {
      DEFAULT: "#fd3f0f",
      accent: "#ffffff",
      foreground: "#3d3d3d",
    },
    secondary: {
      DEFAULT: "#3d3d3d",
      foreground: "#9ca3af",
    },
    success: {
      DEFAULT: "#f0fdf4",
      foreground: "#166534",
    },
    card: {
      DEFAULT: "#f4f4f5",
    },
    disabled: {
      DEFAULT: "#f3f4f6",
      foreground: "#9ca3af",
    },
  },
};

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
console.log("isDarkMode", isDarkMode);
applyColorsToRoot(colors.lightMode);

export const ThemeProvider: FC<Props> = ({ children }) => {
  return <Theme>{children}</Theme>;
};
