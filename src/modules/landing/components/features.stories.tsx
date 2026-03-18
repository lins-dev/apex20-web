import type { Meta, StoryObj } from "@storybook/react";
import { Features } from "./features";

const meta: Meta<typeof Features> = {
  title: "Landing/Features",
  component: Features,
  parameters: { layout: "fullscreen" },
  args: { locale: "en" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PtBr: Story = {
  name: "PT-BR",
  args: { locale: "pt-br" },
};
