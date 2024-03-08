import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../lib/components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    color: 'blue',
    variant: 'solid',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    color: 'blue',
    variant: 'outline',
    children: 'Button',
  },
};

export const XLarge: Story = {
  args: {
    children: 'Button',
    size: '4'
  },
};

export const Large: Story = {
  args: {
    children: 'Button',
    size: '3'
  },
};

export const Medium: Story = {
  args: {
    size: '2',
    children: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: '1',
    children: 'Button',
  },
};
