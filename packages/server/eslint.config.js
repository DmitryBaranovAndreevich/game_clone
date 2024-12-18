const globals = require("globals")
const tsLint = require("typescript-eslint")
const prettierPlugin = require("eslint-plugin-prettier")
const eslintConfigPrettier = require("eslint-config-prettier")

module.exports = tsLint.config(
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
    files: ["**/*.ts"],
    rules: {
      ...eslintConfigPrettier.rules,
      curly: "error",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
)
