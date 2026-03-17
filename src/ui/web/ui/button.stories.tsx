import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Web/UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Apex Button",
    variant: "default",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete Action",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Secondary Action",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Action",
    variant: "ghost",
  },
};
