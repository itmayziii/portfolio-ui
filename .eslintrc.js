module.exports = {
  extends: [
    'plugin:standard-typescript/recommended',
    'plugin:react/recommended'
  ],
  plugins: [
    'react-hooks'
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        // Obvious JS files need to use `require` for now but once modules land in a LTS of Node then we can use imports safely and this can be removed.
        '@typescript-eslint/no-var-requires': 'off',
        // JS files do not have return types.
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    }
  ],
  settings: {
    react: {
      version: 'detect' // https://github.com/yannickcr/eslint-plugin-react#configuration
    }
  }
}
