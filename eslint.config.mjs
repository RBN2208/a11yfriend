import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Warn on unused variables (allow prefixed with _)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Warn on explicit any usage
      "@typescript-eslint/no-explicit-any": "warn",
      // Enforce consistent imports
      "import/order": "off",
    },
  },
  {
    ignores: [".next/", "node_modules/", "supabase/", "*.config.ts", "*.config.mjs"],
  },
];

export default eslintConfig;
