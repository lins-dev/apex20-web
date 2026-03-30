import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import globalsCss from "@/styles/globals.css?url";
import { createRootRoute, HeadContent, Outlet, ScriptOnce, Scripts } from "@tanstack/react-router";

const themeScript = `(function(){var t=localStorage.getItem('apex20-theme');if(t)document.documentElement.setAttribute('data-theme',t);})();`;

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: "stylesheet", href: globalsCss }],
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <ScriptOnce>{themeScript}</ScriptOnce>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
