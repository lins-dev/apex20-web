import { createFileRoute } from "@tanstack/react-router";
import { getLocaleFromCookie } from "@/lib/locale";
import { requireGuest } from "@/lib/auth-guard";
import { SignInForm } from "@/modules/auth";
import { AuthLayout } from "@/modules/auth/components/auth-layout";
import { t } from "@/i18n";

export const Route = createFileRoute("/login")({
  beforeLoad: () => requireGuest(),
  component: LoginPage,
});

function LoginPage() {
  const locale = getLocaleFromCookie();
  return (
    <AuthLayout
      locale={locale}
      title={t("auth.signIn.title", locale)}
      subtitle={t("auth.signIn.subtitle", locale)}
    >
      <SignInForm locale={locale} />
    </AuthLayout>
  );
}
