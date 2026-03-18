import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

// Mock next/navigation for LanguageSwitcher dependency
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

import { Navbar } from "./navbar";

describe("Navbar", () => {
  it("renders the Apex20 logo", () => {
    render(<Navbar locale="pt-br" />);
    expect(screen.getByText("Apex20")).toBeInTheDocument();
  });

  it("renders nav links with translated text in pt-br", () => {
    render(<Navbar locale="pt-br" />);
    // Nav links appear in both desktop and mobile menus — at least one must exist
    expect(screen.getAllByText("Funcionalidades").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Roadmap").length).toBeGreaterThanOrEqual(1);
  });

  it("renders nav links in English when locale is en", () => {
    render(<Navbar locale="en" />);
    expect(screen.getAllByText("Features").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Pricing").length).toBeGreaterThanOrEqual(1);
  });

  it("renders 'Sobre nós' link in pt-br", () => {
    render(<Navbar locale="pt-br" />);
    expect(screen.getAllByText("Sobre nós").length).toBeGreaterThanOrEqual(1);
  });

  it("renders 'About Us' link in English", () => {
    render(<Navbar locale="en" />);
    expect(screen.getAllByText("About Us").length).toBeGreaterThanOrEqual(1);
  });

  it("renders 'Sobre nosotros' link in Spanish", () => {
    render(<Navbar locale="es" />);
    expect(screen.getAllByText("Sobre nosotros").length).toBeGreaterThanOrEqual(1);
  });

  it("renders 'À propos' link in French", () => {
    render(<Navbar locale="fr" />);
    expect(screen.getAllByText("À propos").length).toBeGreaterThanOrEqual(1);
  });

  it("renders hamburger button", () => {
    render(<Navbar locale="pt-br" />);
    expect(screen.getByRole("button", { name: /abrir menu/i })).toBeInTheDocument();
  });

  it("mobile menu is hidden by default", () => {
    render(<Navbar locale="pt-br" />);
    const mobileMenu = screen.getByTestId("mobile-menu");
    expect(mobileMenu).toHaveAttribute("data-open", "false");
  });

  it("opens mobile menu when hamburger is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar locale="pt-br" />);
    const hamburger = screen.getByRole("button", { name: /abrir menu/i });
    await user.click(hamburger);
    const mobileMenu = screen.getByTestId("mobile-menu");
    expect(mobileMenu).toHaveAttribute("data-open", "true");
  });

  it("hamburger aria-label changes to 'Fechar menu' when open", async () => {
    const user = userEvent.setup();
    render(<Navbar locale="pt-br" />);
    const hamburger = screen.getByRole("button", { name: /abrir menu/i });
    await user.click(hamburger);
    expect(screen.getByRole("button", { name: /fechar menu/i })).toBeInTheDocument();
  });

  it("closes mobile menu when hamburger is clicked again", async () => {
    const user = userEvent.setup();
    render(<Navbar locale="pt-br" />);
    const hamburger = screen.getByRole("button", { name: /abrir menu/i });
    await user.click(hamburger);
    const closeBtn = screen.getByRole("button", { name: /fechar menu/i });
    await user.click(closeBtn);
    const mobileMenu = screen.getByTestId("mobile-menu");
    expect(mobileMenu).toHaveAttribute("data-open", "false");
  });

  it("renders language switcher trigger button", () => {
    render(<Navbar locale="en" />);
    expect(screen.getByRole("button", { name: /selecionar idioma/i })).toBeInTheDocument();
  });

  it("desktop nav is accessible via nav element", () => {
    render(<Navbar locale="en" />);
    const nav = screen.getByRole("navigation");
    const desktopLinks = within(nav).getAllByRole("link");
    // Logo link + at least the desktop nav links
    expect(desktopLinks.length).toBeGreaterThanOrEqual(2);
  });
});
