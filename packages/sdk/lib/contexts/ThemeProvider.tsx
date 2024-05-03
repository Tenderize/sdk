import { defaultTheme } from "@lib/constants/theme";
import type { BrandPalette } from "@lib/types/theme";
import { applyColorsToRoot, applyFontFamily } from "@lib/utils";
import { Theme } from "@radix-ui/themes";
import { useEffect, type ComponentProps, type FC, type ReactNode } from "react";

export type ThemeProviderProps = ComponentProps<typeof Theme>;

interface Props {
  children: ReactNode;
  theme?: BrandPalette;
}

export const ThemeProvider: FC<Props> = ({ children, theme }) => {
  // Check if theme is provided, otherwise use default theme
  const addTheme = theme ?? defaultTheme;

  // Detect user's preferred color scheme (dark mode)
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const mode = isDarkMode
    ? addTheme.colors.darkMode
    : addTheme.colors.lightMode;

  useEffect(() => {
    // Apply font family
    applyFontFamily(addTheme.fonts);

    // Apply colors to root
    applyColorsToRoot(mode);
  }, [addTheme.fonts, mode]);

  return <Theme>{children}</Theme>;
};
