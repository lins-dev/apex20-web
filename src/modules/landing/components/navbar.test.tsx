import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const mod = await importOriginal<typeof import("@tanstack/react-router")>();
  return {
    ...mod,
    Link: ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: unknown }) =>
      <a href={to} {...props as object}>{children}</a>,
  };
});

import { Navbar } from "./navbar";

describe("Navbar", () => {
  it("renders the Apex20 logo", () => {
    render(<Navbar locale="pt-br" />);
    expect(screen.getByText("Apex20")).toBeInTheDocument();
  });

  it("renders nav links with translated text in pt-br", () => {
    render(<Navbar locale="pt-br" />);
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
    expect(desktopLinks.length).toBeGreaterThanOrEqual(2);
  });

  it("login button links to /login", () => {
    render(<Navbar locale="en" />);
    const loginLinks = screen.getAllByRole("link", { name: /log in/i });
    expect(loginLinks.length).toBeGreaterThanOrEqual(1);
    expect(loginLinks[0]).toHaveAttribute("href", "/login");
  });

  it("cta button links to /signup", () => {
    render(<Navbar locale="en" />);
    const signupLinks = screen.getAllByRole("link", { name: /start for free/i });
    expect(signupLinks.length).toBeGreaterThanOrEqual(1);
    expect(signupLinks[0]).toHaveAttribute("href", "/signup");
  });

  describe("FR locale — layout stability", () => {
    it("desktop nav links container has min-w-0 to allow shrinking", () => {
      render(<Navbar locale="fr" />);
      const navLinks = screen.getByTestId("desktop-nav-links");
      expect(navLinks.className).toContain("min-w-0");
    });

    it("desktop login button has shrink-0 to prevent wrapping", () => {
      render(<Navbar locale="fr" />);
      const loginLinks = screen.getAllByRole("link", { name: /se connecter/i });
      const desktopLogin = loginLinks.find((el) => el.className.includes("sm:inline-flex"));
      expect(desktopLogin).toBeDefined();
      expect(desktopLogin!.className).toContain("shrink-0");
    });

    it("desktop CTA button has shrink-0 to prevent wrapping", () => {
      render(<Navbar locale="fr" />);
      const ctaLinks = screen.getAllByRole("link", { name: /commencer gratuitement/i });
      const desktopCta = ctaLinks.find((el) => el.className.includes("sm:inline-flex"));
      expect(desktopCta).toBeDefined();
      expect(desktopCta!.className).toContain("shrink-0");
    });
  });
});
