import React from "react";
import type { Preview } from "@storybook/react";
import type { Decorator } from "@storybook/react";
import { ThemeProvider } from "../lib/contexts/ThemeProvider";
import "@radix-ui/themes/styles.css"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

const withThemeProvider: Decorator = (StoryFn) => {
  return (
    <ThemeProvider>
      <StoryFn />
    </ThemeProvider>
  )
}

export const decorators = [withThemeProvider]
