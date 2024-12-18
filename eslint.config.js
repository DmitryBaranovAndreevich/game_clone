import tsLint from "typescript-eslint"
import prettierPlugin from "eslint-plugin-prettier"
import eslintConfigPrettier from "eslint-config-prettier"

export default tsLint.config(
  {
    plugins: {
      "@typescript-eslint": tsLint.plugin,
      prettier: prettierPlugin,
    },
  },
  {
    ignores: ["node_modules", "dist", "**.*js"],
  },
  ...tsLint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 11,
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      ...eslintConfigPrettier.rules,
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
)
