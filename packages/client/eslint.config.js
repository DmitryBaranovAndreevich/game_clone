import js from "@eslint/js"
import globals from "globals"
import eslintReact from "eslint-plugin-react"
import eslintReactHooks from "eslint-plugin-react-hooks"
import eslintReactRefresh from "eslint-plugin-react-refresh"
import tsLint from "typescript-eslint"
import prettierPlugin from "eslint-plugin-prettier"
import eslintConfigPrettier from "eslint-config-prettier"

export default tsLint.config(
  {
    plugins: {
      "react-hooks": eslintReactHooks,
      react: eslintReact,
      "react-refresh": eslintReactRefresh,
      "@typescript-eslint": tsLint.plugin,
      prettier: prettierPlugin,
    },
  },
  {
    ignores: ["node_modules", "dist", "**.*js", "vite.config.ts"],
  },
  js.configs.recommended,
  ...tsLint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        project: ["tsconfig.json"],
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      ...eslintConfigPrettier.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "prefer-const": "error",
      curly: "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "no-useless-escape": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
)
