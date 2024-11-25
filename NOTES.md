# Challenge Notes

### Important Points
- **Time Spent -** Roughly 13 hours
- **Why no atomic styling?** While not incredibly complex, I want to show my general knowledge of css.
- **Why no component library?** Leveraging component libraries as a foundation is definitely my preferred direction on any large project; However, I'd like you to see how I handle components from the ground up.

### Included
- Vite bundling + local server
  - reverse proxy for library api
  - type-checks, linting, testing, preview

- Unit testing - Vitest
  - covered all components/views

- A11y
  - Axe-devtools is all clear sans one contrast issue with an element that is set to aria-hidden="true"(shouldn't be an issue and requires more digging)

- Provider injection

- Pinia - pretty standard store usage

- Simple CSS animations

- Basic Vue-router usage

- SASS styling

- Relative to the structure of the project source, this is fairly close to the structure I tend to use. I typically have many more directories in a given work-related project, such as `src/core/utils/...`, `src/plugins`, `/scripts`, etc

- Desktop device styling

### TO-DO
- Mobile and smaller device responsiveness
- Complete pagination. I usually include first, last, and at least 3 page-number buttons
- Possibly filtering results... while the API used is built with Solr, I'm not finding the data to be all that complete. It would be nice to move to a more rich API with consistent resources.
- Sorting is available in the library API and I think it would be useful to sort on publish date and possibly other facets.
- e2e cypress tests
- Unit test core files and stores directly
- CI workflows + merge checks
- Polish and optimization
