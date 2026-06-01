import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js, react },
    extends: [
      "js/recommended",
    ],
    languageOptions: { globals: globals.browser },
  },
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
]);