module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: {
    es6: true,
    browser: true,
  },
  rules: {
    // https://github.com/typescript-eslint/typescript-eslint/issues/46#issuecomment-470486034
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
  },
};
