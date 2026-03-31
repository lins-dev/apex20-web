import { createFileRoute } from "@tanstack/react-router";
import { getLocaleFromCookie } from "@/lib/locale";
import { requireGuest } from "@/lib/auth-guard";
import { SignUpForm } from "@/modules/auth";
import { AuthLayout } from "@/modules/auth/components/auth-layout";
import { t } from "@/i18n";

export const Route = createFileRoute("/signup")({
  beforeLoad: () => requireGuest(),
  component: SignUpPage,
});

function SignUpPage() {
  const locale = getLocaleFromCookie();
  return (
    <AuthLayout
      locale={locale}
      title={t("auth.signUp.title", locale)}
      subtitle={t("auth.signUp.subtitle", locale)}
    >
      <SignUpForm locale={locale} />
    </AuthLayout>
  );
}
