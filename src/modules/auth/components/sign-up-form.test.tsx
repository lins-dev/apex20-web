import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignUpForm } from "./sign-up-form";

const mockNavigate = vi.fn();
const mockSignIn = vi.fn();

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const mod = await importOriginal<typeof import("@tanstack/react-router")>();
  return {
    ...mod,
    useNavigate: () => mockNavigate,
    Link: ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: unknown }) =>
      <a href={to} {...props as object}>{children}</a>,
  };
});

vi.mock("../hooks/use-auth", () => ({
  useAuth: () => ({ signIn: mockSignIn }),
}));

vi.mock("@/lib/api/clients", () => ({
  createAuthClient: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("SignUpForm", () => {
  it("renders name, email, password, confirm password fields and submit button", () => {
    render(<SignUpForm locale="en" />);
    expect(screen.getByLabelText(/^name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
  });

  it("shows validation error when name is too short", async () => {
    render(<SignUpForm locale="en" />);
    await userEvent.type(screen.getByLabelText(/^name/i), "A");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));
    expect(await screen.findByText(/2 characters/i)).toBeInTheDocument();
  });

  it("shows validation error when email is invalid", async () => {
    render(<SignUpForm locale="en" />);
    await userEvent.type(screen.getByLabelText(/^name/i), "Lucas");
    await userEvent.type(screen.getByLabelText(/^email/i), "not-an-email");
    await userEvent.type(screen.getByLabelText(/^password$/i), "password123");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
  });

  it("shows validation error when passwords do not match", async () => {
    render(<SignUpForm locale="en" />);
    await userEvent.type(screen.getByLabelText(/^name/i), "Lucas");
    await userEvent.type(screen.getByLabelText(/^email/i), "lucas@example.com");
    await userEvent.type(screen.getByLabelText(/^password$/i), "password123");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "different123");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));
    expect(await screen.findByText(/do not match/i)).toBeInTheDocument();
  });

  it("redirects to / after successful sign up", async () => {
    const { createAuthClient } = await import("@/lib/api/clients");
    vi.mocked(createAuthClient).mockReturnValue({
      signUp: vi.fn().mockResolvedValue({ accessToken: "jwt.token", userId: "abc" }),
    } as never);

    render(<SignUpForm locale="en" />);
    await userEvent.type(screen.getByLabelText(/^name/i), "Lucas");
    await userEvent.type(screen.getByLabelText(/^email/i), "lucas@example.com");
    await userEvent.type(screen.getByLabelText(/^password$/i), "password123");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith({ to: "/" }));
  });

  it("shows error message when email is already in use", async () => {
    const { ConnectError, Code } = await import("@connectrpc/connect");
    const { createAuthClient } = await import("@/lib/api/clients");
    vi.mocked(createAuthClient).mockReturnValue({
      signUp: vi.fn().mockRejectedValue(new ConnectError("already exists", Code.AlreadyExists)),
    } as never);

    render(<SignUpForm locale="en" />);
    await userEvent.type(screen.getByLabelText(/^name/i), "Lucas");
    await userEvent.type(screen.getByLabelText(/^email/i), "taken@example.com");
    await userEvent.type(screen.getByLabelText(/^password$/i), "password123");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));

    expect(await screen.findByText(/already registered/i)).toBeInTheDocument();
  });
});
