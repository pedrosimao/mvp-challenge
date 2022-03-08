# ReactTS 17 Start-up Starter (SPA)

My personal starter project! It was forked from [vite-reactts17-chakra-jest-husky](https://github.com/The24thDS/vite-reactts17-chakra-jest-husky) and improved upon.
It is intended to quickly bootstrap React SPA apps for any React project.

This is a [React](https://reactjs.org) + [TypeScript](https://www.typescriptlang.org/) + [Chakra UI](https://chakra-ui.com) boilerplate to be built with [Vite](https://vitejs.dev).

## What's inside?

- [ReactJS](https://reactjs.org)
- [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Chakra UI](https://chakra-ui.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Vitest](https://vitest.dev)
- [Testing Library](https://testing-library.com)
- [Cypress](https://www.cypress.io)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Husky](https://typicode.github.io/husky)

\+ other smaller dependencies

## Todo

- Add a full Chakra UI Theme Example
- Configure `Cypress` to mount React components (SVG and Macros issues)
- Add `typesafe-i18n` as translation Library
- Add `inlang` as translation host
- Add `axios` with examples
- Add `react-query` with examples
- Add a branch with authenticated / unauthenticated routes examples

# Technical choices

- Imports are sorted automatically (rules can be changed via .eslintrc.js config file)
- ESLint and Prettier are integrated with VSCode out of the box (you just need VSCode's ESLint plugin).
- Prettier is integrated with ESLint, so you do not need the Prettier plugin. [More information here](https://prettier.io/docs/en/integrating-with-linters.html#notes)
- Improved lint-staged configuration: linting will only happen on staged files, not all files.
- Because of Husky settings, Typescript types and linting are checked before each commit. If for some reason you want to ignore and commit anyway you can use the `--no-verify` flag. (ex.: `git commit --no-verify -m "Updated README.md"`)

For automatic ES-Lint corrections on VSCode, this setting was added to this project:

```
// .vscode/settings.json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

For the same in Webstorm follow these instructions:
`https://www.jetbrains.com/help/webstorm/eslint.html#ws_eslint_configure_run_eslint_on_save`

## Getting started

1. Create the project.

   ```bash
   npx degit PedroSimao/react-startup-starter my-app
   ```

2. Access the project directory.

   ```bash
   cd my-app
   ```

3. Initialize a git repository.

   ```bash
   git init
   ```

4. Install dependencies.

   ```bash
   yarn
   ```

5. Serve with hot reload at http://localhost:3000.
   ```bash
   yarn dev
   ```

## Recommended VS Code extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)

## Other commands

### Lint commands

- Run eslint
  ```bash
  yarn lint
  ```
- Run eslint with fixing
  ```bash
  yarn lint:fix
  ```

### Build commands

```bash
yarn build
```

### Test commands

- Run tests with coverage (will open the coverage if all tests succeed)
  ```bash
  yarn test
  ```
- Watch tests
  ```bash
  yarn test:watch
  ```

## License

This project is licensed under the MIT License.
