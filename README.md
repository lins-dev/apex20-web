# apex20-web

Frontend do **Apex20** — Virtual Tabletop para RPG.

Construído com **TanStack Start (React 19)**, Vinxi, Tailwind CSS v4, Zustand e XState. Design system e i18n internalizados em `src/`.

## Pré-requisitos

- Node.js v24+ (LTS)
- npm v10+

## Instalação

```bash
npm install
```

## Comandos

```bash
npm run dev        # servidor de desenvolvimento (Vinxi)
npm run build      # build de produção
npm run start      # inicia o build de produção
npm run lint       # ESLint
npm run typecheck  # verificação de tipos TypeScript
npm run test       # Testes unitários (Vitest)
npm run test:visual # Testes visuais (Playwright)
```

## Estrutura

```
src/
  routes/      Rotas e layouts (TanStack Router)
  modules/     Funcionalidades isoladas por domínio (ADR-036)
  ui/          Design system (tokens, componentes)
  i18n/        Internacionalização (EN, PT-BR, ES, FR)
  lib/         Configurações de terceiros e API
  hooks/       Hooks globais
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha os valores usando o prefixo `VITE_`.

## Documentação

Consulte o submodule `apex20-docs` para mais detalhes técnicos e ADRs.
