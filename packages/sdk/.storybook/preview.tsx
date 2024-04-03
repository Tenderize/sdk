import "@radix-ui/themes/styles.css";
import type { Decorator, Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../lib/contexts/ThemeProvider";

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
  );
};

export const decorators = [withThemeProvider];
