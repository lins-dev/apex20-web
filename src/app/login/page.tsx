import { headers } from "next/headers";
import type { Locale } from "@/i18n";
import { t } from "@/i18n";
import { SignInForm } from "@/modules/auth";

export default async function LoginPage() {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") ?? "pt-br") as Locale;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {t("auth.signIn.title", locale)}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("auth.signIn.subtitle", locale)}
          </p>
        </div>
        <SignInForm locale={locale} />
      </div>
    </main>
  );
}
