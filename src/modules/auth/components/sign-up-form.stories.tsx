import type { Meta, StoryObj } from "@storybook/react-vite";
import { SignUpForm } from "./sign-up-form";

const meta: Meta<typeof SignUpForm> = {
  title: "Auth/SignUpForm",
  component: SignUpForm,
  parameters: { layout: "centered" },
  args: { locale: "en" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PtBr: Story = {
  name: "PT-BR",
  args: { locale: "pt-br" },
};

export const Es: Story = {
  name: "ES",
  args: { locale: "es" },
};

export const Fr: Story = {
  name: "FR",
  args: { locale: "fr" },
};
