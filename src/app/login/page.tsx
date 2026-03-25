import { headers } from "next/headers";
import type { Locale } from "@/i18n";
import { t } from "@/i18n";
import { SignInForm } from "@/modules/auth";
import { AuthLayout } from "@/modules/auth/components/auth-layout";

export default async function LoginPage() {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") ?? "pt-br") as Locale;

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
