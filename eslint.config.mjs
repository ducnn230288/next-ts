import { FlatCompat } from "@eslint/eslintrc";
import pluginSonarjs from 'eslint-plugin-sonarjs';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      sonarjs: pluginSonarjs,
    },
    rules: {
      // ...pluginSonarjs.configs.recommended.rules,
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          disallowTypeAnnotations: false,
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@next/next/no-page-custom-font': 'off',
      '@next/next/no-css-tags': 'off',
    },
  },
];

export default eslintConfig;
