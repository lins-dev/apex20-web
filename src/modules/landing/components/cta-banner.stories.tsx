import type { Meta, StoryObj } from "@storybook/react";
import { CtaBanner } from "./cta-banner";

const meta: Meta<typeof CtaBanner> = {
  title: "Landing/CtaBanner",
  component: CtaBanner,
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
