# Rockbot Challenge

<span style="color:red">* Local dev instructions are at the end of this files</span>

## Purpose:
The purpose of the project is to show examples of how I structure a Vue project, my typical coding style, and my preferred usage of typescript, css(scss), and HTML. I've tried to cover as much of the Rockbot Engineering Challenge document as possible so that you have a good idea of my approach to application development. In a nutshell, I'm focusing on showing my practices and conventions with solid and straightforward examples.

#### Organization:
I've set out the file structure that I prefer sans some directories such as `src/plugins` and `scripts`(general local utility). The important concept here is the separation of concerns between components, stores, and core files.

Components are simply organized in an easy to use file structure.

Stores are separated from the rest of the codebase and ONLY contain methods for store modification, NOT for requesting data.

Core files are split up by purpose and domain. The domain directories contain all types, general functionality, and request handling files relative to that domains language/boundaries/etc. Importantly, the request handling files, named as `<domain>-web.ts` act as an easy to update request, translation(avoided when possible), and anti-corruption layer. Note that I'd typically use an overarching request wrapper which can handle global exceptions for statuses such as 40x.

#### Components
I've created components in this project using my preferred practices. For ease of use, I usually separate components into a `src/views` directory and a `src/components` directory; where the views are mostly concerned with UX layout and making high level requests and store usage.

As for components, I absolutely prefer templates to JSX, and I think that reusability is extemely important. That said, mostly everyone agrees that reusability is important, so here's a good example of what I'm driving at: Given a single search service, with consistent endpoints or a single endpoint, the goal is NOT to create an entirely new kind of autocomplete component per search type. Extending a base search component or abstracting unique use cases into core files which are pulled into the single component are both preferrable in my opinion. A second example is usage of dropdown items, which I WOULD find better suited to completely separate components in a `dropdown-options` or similar.

#### HTML (and a11y related aspects)
I've use semantic HTML throughout the project, and I would refine this more given more time. I find that leveraging semantic HTML and a11y techniques up from can save developers from unnecessary iteration. Ticket refinement is a great time to bring up any possible concerns regarding a11y. I've covered accessibility for this UI using Axe devtools. Given more time on a work project, I usually run through Axe and lighthouse, as well as test all functionality with a screen-reader.

#### Typescript
This project is built with typescript. I'm quite fond of Typescript after having used it for a few years now. I like to centralize large cross-cutting type to core files, and prefer to avoid centralizing single-use types such as smalls type in components. I think that types can be overdone, especially when trying to cover every single inch of the app with generics and single-use interfaces. I've heard the term "type gymnastics" before, and I do think developers can get lost in spending more time on their types than the actual feature implementation.

Also, I do like enums when they are defined `as const` :)

#### CSS
This project leverages Sass. I've avoided atomic css such as tailwind in order to show my knowledge of general css. I would typically use Sass, but as browsers are implementing more and more useful features, I see css pre-processors becoming obsolete in the future, which will be awesome. Also, I prefer nesting to other organization methods such as BEM.

#### Design
I've used a color palette I created from Material Design colors and gone with a look and feel that I think shows my use of animations and basic UX. My goto design language is Material Design; although, I've never seen a company stick with a version of Material Design strictly, and they tend to deviate over time.

#### State Management
Pinia is, of course, the current standard for Vue. I thinks it's great that they got rid of separate mutations, as Vuex had, and now only have actions. As I mentioned in the organization section, I keep all logic in my stores strictly relative to state management.

- Providers: I've used providers as I typically use them in all of my projects. They are especially handy for utilizing app-wide plugins within composables and Vue's composition-api.

#### Testing
- Unit: I've covered all store, core, component, view, and router files using vitest.
- e2e: I've added one example of e2e testing for app usage on the homepage. This has been done to work around time restrictions. I find that covering all views of the app for the optimal-cases and defects or regressions. Defects and regressions being added retroactively post p1/p0. I'm a fan of the pyramid where e2e is at the apex, then integration, then unit tests.

#### CI/CD
- No CI/CD has been implemented for this project given the time constraints and lack of a deployment target. Let me know if you'd like me to add CI.

#### Third-Party Integration
I've used a simple api provided by `openlibrary.org`. It is proxied through the dev server(defined in `vite.config.ts`) for local development.

#### Performance
For this project, I've leveraged lighthouse for basic quick and dirty performance checks. Views are currently loaded via Vue-routers lazy loading conventions. I have not yet added any code splitting configuration to this project.

#### Responsiveness
I used container queries throughout this app to handle small screen sizes. In contrast, when given time to plan out an application, I prefer to develop mobile-first and leverage basic page flow as a foundation.

#### Tooling
Vite, Vitest, Vue3, Sass, Typescript/Vue-tsc, Vue-Router, Pinia, Cypress, ESLint/Prettier

<br /><br /><br />

## Requirements
**npm**: `>=10.2.4`
**node**:`>=20.11.1`

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
