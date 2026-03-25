"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConnectError, Code } from "@connectrpc/connect";
import Link from "next/link";

import { t, type Locale } from "@/i18n";
import { createAuthClient } from "@/lib/api/clients";
import { signInSchema, type SignInFormData } from "../types";
import { useAuth } from "../hooks/use-auth";

interface SignInFormProps {
  locale: Locale;
}

export function SignInForm({ locale }: SignInFormProps) {
  const router = useRouter();
  const { signIn } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: SignInFormData) {
    setServerError(null);
    try {
      const client = createAuthClient();
      const res = await client.signIn({ email: data.email, password: data.password });
      signIn(res.accessToken);
      router.push("/");
    } catch (err) {
      if (err instanceof ConnectError && err.code === Code.Unauthenticated) {
        setServerError(t("auth.errors.invalidCredentials", locale));
      } else {
        setServerError(t("auth.errors.generic", locale));
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          {t("auth.signIn.emailLabel", locale)}
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder={t("auth.signIn.emailPlaceholder", locale)}
          {...register("email")}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.email && (
          <p className="text-xs text-destructive">{t("auth.errors.email", locale)}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          {t("auth.signIn.passwordLabel", locale)}
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder={t("auth.signIn.passwordPlaceholder", locale)}
          {...register("password")}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.password && (
          <p className="text-xs text-destructive">{t("auth.errors.passwordMin", locale)}</p>
        )}
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-destructive">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {isSubmitting ? "..." : t("auth.signIn.submit", locale)}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        {t("auth.signIn.noAccount", locale)}{" "}
        <Link href="/signup" className="font-medium text-primary hover:underline">
          {t("auth.signIn.createAccount", locale)}
        </Link>
      </p>
    </form>
  );
}
