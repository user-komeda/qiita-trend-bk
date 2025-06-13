import eslintNestJs from '@darraghor/eslint-plugin-nestjs-typed'
import tseslint from 'typescript-eslint'
import js from '@eslint/js'
import globals from 'globals'
import vitest from '@vitest/eslint-plugin'
import prettier from 'eslint-config-prettier'
import unusedImports from 'eslint-plugin-unused-imports'
import importPlugin from 'eslint-plugin-import'

// ... and all your other imports
export default tseslint.config(
  {
    files: ['./src/**/*.{mjs,ts,mts}'],
    extends: [
      js.configs.recommended,
      importPlugin.flatConfigs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylistic,
      ...tseslint.configs.stylisticTypeChecked,
      eslintNestJs.configs.flatRecommended, // This is the recommended ruleset for this plugin
      prettier,
    ],
    plugins: {
      'unused-imports': unusedImports,
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-extraneous-class': 'off', // This rule is not compatible with NestJS
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'sibling', 'index', 'object', 'type'],
          alphabetize: { order: 'asc', caseInsensitive: false },
          'newlines-between': 'always',
        },
      ],
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['src/**/*.test.ts'],
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.all.rules, // you can also use vitest.configs.all.rules to enable all rules
      'vitest/consistent-test-it': ['error', { fn: 'test' }],
      'vitest/no-hooks': [
        'error',
        {
          allow: ['beforeEach'],
        },
      ],
      'max-lines-per-function': ['error', 100],
      'max-params': ['error', 4],
      ' @typescript-eslint/unbound-method': 'off',
    },
  },
)
