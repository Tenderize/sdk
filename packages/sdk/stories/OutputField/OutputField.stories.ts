import type { Meta, StoryObj } from "@storybook/react";

import { OutputField } from "../../lib/components";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/OutputField",
  component: OutputField,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof OutputField>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    value: "22422.34",
  },
};
export const Classic: Story = {
  args: {
    value: "22422.34",
    variant: "classic",
  },
};
export const Soft: Story = {
  args: {
    value: "22422.34",
    variant: "soft",
  },
};
export const Surface: Story = {
  args: {
    value: "22422.34",
    variant: "surface",
  },
};
