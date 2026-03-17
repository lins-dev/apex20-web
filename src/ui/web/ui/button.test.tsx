import { render, screen } from "@testing-library/react";
import { Button } from "./button";
import { describe, it, expect, vi } from "vitest";

describe("Button Component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    // ADR-013: Acessibilidade (Focus targets)
    expect(button).toHaveClass("inline-flex", "items-center", "justify-center");
  });

  it("applies variant classes correctly", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toHaveClass("bg-destructive");
  });

  it("applies size classes correctly", () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole("button", { name: /large button/i });
    expect(button).toHaveClass("h-11", "px-8");
  });

  it("handles click events correctly", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    const button = screen.getByRole("button", { name: /clickable/i });
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is accessible via keyboard (Focus management)", () => {
    render(<Button>Focus me</Button>);
    const button = screen.getByRole("button", { name: /focus me/i });
    button.focus();
    expect(document.activeElement).toBe(button);
  });
});
