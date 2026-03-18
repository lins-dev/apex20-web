import type { Meta, StoryObj } from "@storybook/react";
import { Systems } from "./systems";

const meta: Meta<typeof Systems> = {
  title: "Landing/Systems",
  component: Systems,
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
