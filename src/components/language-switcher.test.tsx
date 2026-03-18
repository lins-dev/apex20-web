import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next/navigation
const mockRefresh = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: mockRefresh }),
}));

import { LanguageSwitcher } from "./language-switcher";

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    mockRefresh.mockClear();
    document.cookie = "";
  });

  it("renders a trigger button (not a native select)", () => {
    render(<LanguageSwitcher current="pt-br" />);
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /selecionar idioma/i })).toBeInTheDocument();
  });

  it("dropdown is closed by default", () => {
    render(<LanguageSwitcher current="pt-br" />);
    expect(screen.getByRole("button", { name: /selecionar idioma/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("shows current locale label on the trigger button", () => {
    render(<LanguageSwitcher current="fr" />);
    const button = screen.getByRole("button", { name: /selecionar idioma/i });
    expect(button).toHaveTextContent("FR");
  });

  it("renders a flag svg inside the trigger button", () => {
    const { container } = render(<LanguageSwitcher current="pt-br" />);
    const button = container.querySelector("button");
    expect(button?.querySelector("svg")).toBeInTheDocument();
  });

  it("opens dropdown on button click", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher current="pt-br" />);
    await user.click(screen.getByRole("button", { name: /selecionar idioma/i }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /selecionar idioma/i })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("shows all 4 locale options when open", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher current="pt-br" />);
    await user.click(screen.getByRole("button", { name: /selecionar idioma/i }));
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);
  });

  it("each option has a flag svg", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher current="pt-br" />);
    await user.click(screen.getByRole("button", { name: /selecionar idioma/i }));
    const listbox = screen.getByRole("listbox");
    const flags = listbox.querySelectorAll("svg");
    expect(flags.length).toBe(4);
  });

  it("marks current locale option as selected", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher current="es" />);
    await user.click(screen.getByRole("button", { name: /selecionar idioma/i }));
    const esOption = screen.getByRole("option", { name: /ES/i });
    expect(esOption).toHaveAttribute("aria-selected", "true");
  });

  it("sets cookie and calls router.refresh when locale is selected", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher current="pt-br" />);
    await user.click(screen.getByRole("button", { name: /selecionar idioma/i }));
    const enOption = screen.getByRole("option", { name: /EN/i });
    await user.click(enOption);
    expect(document.cookie).toContain("apex20-locale=en");
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it("closes dropdown after selecting a locale", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher current="pt-br" />);
    await user.click(screen.getByRole("button", { name: /selecionar idioma/i }));
    await user.click(screen.getByRole("option", { name: /FR/i }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes dropdown when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <LanguageSwitcher current="pt-br" />
        <span data-testid="outside">outside</span>
      </div>,
    );
    await user.click(screen.getByRole("button", { name: /selecionar idioma/i }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.click(screen.getByTestId("outside"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
