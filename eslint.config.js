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
);
