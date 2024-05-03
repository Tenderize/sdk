import type { BrandPalette } from "@lib/types/theme";
import { applyColorsToRoot, applyFontFamily } from "@lib/utils";
import { Theme } from "@radix-ui/themes";
import { useEffect, type ComponentProps, type FC, type ReactNode } from "react";

export type ThemeProviderProps = ComponentProps<typeof Theme>;

interface Props {
  children: ReactNode;
  theme?: BrandPalette;
}
const defaultTheme = {
  spacing: "16px", //Todo: add spacing in app according to design needs
  fonts: {
    name: "'Lato', sans-serif",
    familyUrl:
      "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap",
  },
  colors: {
    lightMode: {
      border: "#eee",
      primary: {
        DEFAULT: "#fd3f0f",
        accent: "#ffffff",
        foreground: "#3d3d3d",
      },
      secondary: {
        DEFAULT: "#d1d5db",
        foreground: "#9ca3af",
        accent: "#ffffff",
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
  },
};

export const ThemeProvider: FC<Props> = ({ children, theme }) => {
  // Check if theme is provided, otherwise use default theme
  const addTheme = theme ?? defaultTheme;

  // Detect user's preferred color scheme (dark mode)
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  console.log("isDarkMode", isDarkMode);

  useEffect(() => {
    // Apply font family
    applyFontFamily(addTheme.fonts);

    // Apply colors to root
    applyColorsToRoot(addTheme.colors.lightMode);
  }, [addTheme.fonts, addTheme.colors.lightMode]);

  return <Theme>{children}</Theme>;
};
