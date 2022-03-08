module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
    'plugin:cypress/recommended',
    // Allow Cypress using an assertion such as expect(value).to.be.true
    'plugin:chai-friendly/recommended',
  ],
  env: {
    browser: true,
    es2021: true,
    jest: true,
    'cypress/globals': true,
  },
  plugins: [
    'react',
    // Ensures accessibility is checked
    'jsx-a11y',
    'react-hooks',
    'cypress',
    'chai-friendly',
    '@typescript-eslint',
    '@emotion',
    'simple-import-sort',
  ],
  parserOptions: {
    typescript: true,
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [{ files: ['*.ts', '*.tsx', '*.js', '*.jsx'] }],
  // We don't want to lint generated files nor node_modules,
  // but we want to lint .prettierrc.js (ignored by default by eslint)
  ignorePatterns: ['node_modules/*', '.build/*', '.dist/*', '!.prettierrc.js'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        /* Variables named _ or __ or ___... won"t be checked as unused
         * Useful to exclude a property from an object
         * Example:
         * const { dontWantThis: _, ...wantTheRest } = myObj; */
        varsIgnorePattern: '^_*$',
      },
    ],
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'prefer-destructuring': [
      1,
      {
        VariableDeclarator: { array: false, object: true },
        AssignmentExpression: { array: true, object: false },
      },
      { enforceForRenamedProperties: false },
    ],
    'class-methods-use-this': 0,
    'import/imports-first': 1,
    'import/no-unresolved': 2,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'no-restricted-imports': [
      'warn',
      {
        name: '@emotion/styled',
        message:
          'Please use @emotion/styled/macro instead. See https://emotion.sh/docs/babel-macros',
      },
      {
        name: '@emotion/react',
        message:
          'Please use @emotion/react/macro instead. See https://emotion.sh/docs/babel-macros',
      },
      {
        name: 'typed-redux-saga',
        message:
          'Please use @typed-redux-saga/macro instead. ' +
          'See https://github.com/agiledigital/typed-redux-saga#babel-macro',
      },
    ],
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-template': 2,
    'react/forbid-prop-types': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-closing-bracket-location': 2,
    'react/jsx-no-target-blank': 0,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/jsx-wrap-multilines': 0,
    'react/destructuring-assignment': 0,
    'react/function-component-definition': 0,
    'react/jsx-filename-extension': 0,
    'require-yield': 0,
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'no-empty': [2, { allowEmptyCatch: true }],
    'react/prop-types': 0,

    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,

    // There is a bug with typescript-eslint...
    // It"s safe anyway to remove this rule since typescript will do checks anyway
    'no-use-before-define': 0,

    // We want to be able to throw error objects
    'no-throw-literal': 0,

    // Maximum line length of 100 characters
    'max-len': ['warn', { code: 100 }],

    // Define imports sort and grouping rules
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ['^', '^src'],
          // Relative imports.
          // Anything that starts with a dot.
          ['^\\.'],
          // Style imports.
          ['^.+\\.s?css$', 'styles$'],
        ],
      },
    ],
    'import/no-anonymous-default-export': [
      'error',
      {
        allowArrowFunction: true,
        allowAnonymousFunction: true,
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: {
        map: [
          ['typings', './typings'],
          ['src', './src'],
        ],
        extensions: ['.d.ts', '.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
}
