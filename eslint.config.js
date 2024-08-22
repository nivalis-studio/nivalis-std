import { nivalis } from '@nivalis/eslint-config';

export default nivalis(
  {
    typescript: {
      configPath: './tsconfig.json',
    },
  },
  {
    rules: {
      'func-style': 'off',
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      'no-empty-function': 'off',
    },
  },
);
