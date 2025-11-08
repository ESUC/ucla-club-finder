// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";

export default [
  // Ignore build artifacts and server files
  {
    ignores: [
      "**/node_modules/**",
      "build/**",
      "dist/**",
      "coverage/**",
      "server/**",
    ],
  },
  js.configs.recommended,

  // React/JSX in the client app
  {
    files: ["client/**/*.{js,jsx}", "client/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },
    rules: {
      // React recommended
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // New JSX transform => no need to import React
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // You’re not using PropTypes; disable the noise
      "react/prop-types": "off",

      // Allow quotes/apostrophes in JSX text
      "react/no-unescaped-entities": "off",

      // House rules
      "import/order": ["warn", { "newlines-between": "always" }],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off",
    },
    settings: { react: { version: "detect" } },
  },

  // Tests: allow Jest globals
  {
    files: ["**/*.test.{js,jsx}", "**/__tests__/**/*.{js,jsx}"],
    languageOptions: {
      globals: { ...globals.jest, ...globals.node },
    },
    rules: {
      // keep tests flexible
    },
  },
];
