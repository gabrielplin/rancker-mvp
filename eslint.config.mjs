import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import * as tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import importHelpers from 'eslint-plugin-import-helpers';
import cypress from 'eslint-plugin-cypress';

export default defineConfig([
  ...nextVitals,

  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'coverage/**',
    'dist/**'
  ]),

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: false
      }
    },
    plugins: {
      prettier,
      'import-helpers': importHelpers
    },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
          jsxSingleQuote: true,
          trailingComma: 'none',
          printWidth: 80,
          quoteProps: 'as-needed'
        }
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-namespace': 'off',

      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'never',
          groups: [
            'module',
            '/^~\\/domain/',
            '/^~\\/data/',
            '/^~\\/infra/',
            '/^~\\/main/',
            '/^~\\/presentation/',
            ['parent', 'sibling', 'index']
          ],
          alphabetize: { order: 'asc', ignoreCase: false }
        }
      ]
    }
  },

  {
    files: ['**/*.cy.{ts,tsx}', 'cypress/**/*.{ts,tsx}'],
    languageOptions: { globals: { ...cypress.environments.globals } }
  }
]);
