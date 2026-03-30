// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import tseslint from "typescript-eslint";

export default tseslint.config(...tseslint.configs.recommended, {
  ignores: [".next/**", "out/**", "build/**", "next-env.d.ts", "node_modules/**"],
}, storybook.configs["flat/recommended"]);
