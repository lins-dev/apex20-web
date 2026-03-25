import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignInForm } from "./sign-in-form";

const mockSignIn = vi.fn();
const mockPush = vi.fn();

vi.mock("../hooks/use-auth", () => ({
  useAuth: () => ({ signIn: mockSignIn }),
}));

vi.mock("@/lib/api/clients", () => ({
  createAuthClient: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("SignInForm", () => {
  it("renders email, password fields and submit button", () => {
    render(<SignInForm locale="en" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows validation error when email is empty", async () => {
    render(<SignInForm locale="en" />);
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
  });

  it("shows validation error when password is too short", async () => {
    render(<SignInForm locale="en" />);
    await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "short");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(await screen.findByText(/8 characters/i)).toBeInTheDocument();
  });

  it("redirects to / after successful sign in", async () => {
    const { createAuthClient } = await import("@/lib/api/clients");
    vi.mocked(createAuthClient).mockReturnValue({
      signIn: vi.fn().mockResolvedValue({ accessToken: "jwt.token", userId: "abc" }),
    } as never);

    render(<SignInForm locale="en" />);
    await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/"));
  });

  it("shows error message on invalid credentials", async () => {
    const { ConnectError, Code } = await import("@connectrpc/connect");
    const { createAuthClient } = await import("@/lib/api/clients");
    vi.mocked(createAuthClient).mockReturnValue({
      signIn: vi.fn().mockRejectedValue(new ConnectError("unauthenticated", Code.Unauthenticated)),
    } as never);

    render(<SignInForm locale="en" />);
    await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "wrongpassword");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText(/invalid email or password/i)).toBeInTheDocument();
  });
});
