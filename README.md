# apex20-web

Frontend do **Apex20** — Virtual Tabletop para RPG.

Construído com Next.js 16 (App Router), Tailwind CSS v4, Zustand e XState. Design system e i18n internalizados em `src/`.

## Pré-requisitos

- Node.js v20+
- npm v10+

## Instalação

```bash
npm install
```

## Comandos

```bash
npm run dev        # servidor de desenvolvimento (porta 3000)
npm run build      # build de produção
npm run start      # inicia o build de produção
npm run lint       # ESLint
npm run typecheck  # verificação de tipos TypeScript
```

## Estrutura

```
src/
  app/         Rotas e layouts (Next.js App Router)
  modules/     Funcionalidades isoladas por domínio (ADR-036)
  components/  Componentes globais
  hooks/       Hooks de infraestrutura
  lib/         Configurações de terceiros
  ui/          Design system (tokens, componentes)
  i18n/        Internacionalização (EN, PT-BR, ES, FR)
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha os valores.

## Documentação

Consulte o submodule `docs/` ou o repositório [apex20-docs](https://github.com/lins-dev/apex20-docs).
