# Rockbot Challenge

## Project Setup

```sh
npm i
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
- Dev Debug Mode

    ```sh
    npm run dev:debug
    ```

### Build - Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Preview Mode
Ensure that you have run the build prior to running preview mode.
```sh
npm run build
```

### Type-Check only

```sh
npm run type-check
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

<!-- ### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
``` -->

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
- Running Lint w/ Fix
    ```sh
    npm run lint:fix
    ```
