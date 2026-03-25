import { headers } from "next/headers";
import type { Locale } from "@/i18n";
import { t } from "@/i18n";
import { SignUpForm } from "@/modules/auth";
import { AuthLayout } from "@/modules/auth/components/auth-layout";

export default async function SignUpPage() {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") ?? "pt-br") as Locale;

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
