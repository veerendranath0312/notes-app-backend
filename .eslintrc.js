module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: 'eslint:recommended',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],

    // Check quality only using ===
    eqeqeq: 'error',

    // Prevent unnecessary trailing spaces
    'no-trailing-spaces': 'error',

    // Always requires a space before and after curly braces
    'object-curly-spacing': ['error', 'always'],

    // Consistent use of white spaces in the function params of the arrow function
    'arrow-spacing': ['error', { before: true, after: true }],

    // Disable console.log commands
    'no-console': 0
  }
}
