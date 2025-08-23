# Next.js + TypeScript Starter

This project is a modern Next.js application built with TypeScript, featuring Hot Module Replacement (HMR), ESLint, Tailwind CSS, Redux Toolkit for state management, TanStack plugins, and a modular folder structure for scalable development.

## Features

- ⚡️ Fast development with Next.js
- 🌐 Multi-language support using `next-intl`
- 🐳 Docker support for production (`.docker/`)
- 🎨 Tailwind CSS for rapid UI styling
- 🗂️ Modular architecture with scientific Atomic Design (atoms, molecules, organisms, templates, pages)
- 🗃️ Robust global state management powered by [Redux Toolkit](https://redux-toolkit.js.org/)
- 🧑‍🎨 Automatic code formatting with Prettier
- 📝 Commit message linting with Commitlint
- 🦮 Git hooks automation with Husky
- 📅 Date/time manipulation with Day.js
- 🤖 E2E testing with Robot Framework
- 🧩 Advanced features powered by TanStack ecosystem libraries (forms, queries, tables, virtualization)
- 🛠️ All UI components are implemented in pure React code (no external UI libraries), making future extension and customization easy
- 📝 Simply declare an array of objects and pass it to the component to automatically render dynamic forms and tables

## TanStack Plugins

This project uses several [TanStack](https://tanstack.com/) libraries to provide advanced features for forms, queries, tables, and virtualization:

- 📝 **@tanstack/react-form**: Advanced form state management and validation for React. Provides hooks and utilities for building complex forms with field-level validation, error handling, and dynamic form logic. See usage in shared/components/organisms/form for form handling.
- 🔄 **@tanstack/react-query**: Powerful tool for data fetching, caching, synchronizing, and updating server state in React apps. It provides hooks for queries and mutations, automatic background updates, and built-in support for pagination, optimistic updates, and error handling. See usage in `src/core/stores/api/index.ts` and feature modules for API integration.
- 📊 **@tanstack/react-table**: Headless table logic for building complex, customizable tables. Provides hooks for sorting, filtering, pagination, and row virtualization, allowing you to build any table UI. See usage in shared/components/organisms/data-grid for table features.
- 🧮 **@tanstack/react-virtual**: Efficiently render large lists and tables with virtual scrolling. Optimizes rendering performance by only mounting visible items, making large datasets smooth and responsive. See usage in shared/components/atoms/row-virtualizer and shared/components/organisms/data-grid components.

These plugins help you build scalable, high-performance React applications with best practices for state, data, and UI management.

## Redux Toolkit

[Redux Toolkit](https://redux-toolkit.js.org/) is used for efficient and scalable state management in the project. It simplifies Redux logic with built-in utilities for creating slices, reducers, and async actions. See usage in `src/core/stores/global` and feature modules for global state management.

## Project Structure

```
src/
  app/                # Next.js app directory (routing, layouts, locale-based pages)
    [locale]/         # Multi-language support (main pages, auth flows, locale components/constants)
    api/              # API route handlers (auth, register, user management)
    auth/             # Authentication pages and layouts
    .components/      # Page-level components grouped by feature
    .constants/       # Page-level constants (API, links, forms, tables)
  core/               # Config, layouts, services, stores
    config/           # App-wide configuration (auth, theme, i18n)
    lib/              # Shared libraries (i18n, messages)
    services/         # API, message, error handling
    stores/           # State management (global, api)
  shared/             # Reusable components, assets, constants, enums, models, types, utils
    assets/           # Images and static files
    components/       # Atomic, molecular, organism components
      atoms/          # Basic UI components (button, icon, avatar, etc.)
      molecules/      # Compound UI components (dropdown, entry, dialog, etc.)
      organisms/      # Complex UI components (form, data-grid, etc.)
      templates/      # Template-level components (error-404, loading, etc.)
    constants/        # API endpoints, locale, mask, etc.
    enums/            # Dialog, form, icon, table, etc.
    models/           # Data models and interfaces
    types/            # TypeScript types for forms, tables, API responses, etc.
    utils/            # Utility functions (formatting, array, object, etc.)
  middleware.ts       # Next.js Middleware for handling authentication, redirects, logging, or custom request/response logic
  style.scss          # Global styles (can be replaced by Tailwind)
  tailwind.css        # Tailwind base styles
public/
  assets/             # Images, libraries, styles
  locales/            # Translation files (en, vi, ...)
  ...                 # Favicon, manifest, etc.
.docker/              # Docker config for dev & prod
.e2e/                 # E2E test scripts, keywords, results
```

## Getting Started

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to view the application.

You can edit the main page by modifying `src/app/[locale]/(main)/page.tsx`. Changes will be reflected automatically.

## Running with Docker

You can also run the application using Docker for production:

**Production:**

```bash
npm run docker:prod
```

This will start the production containers.

For custom setups, see the Dockerfiles and Compose files in the `.docker/` directory.

## Next.js internationalization (i18n)

[next-intl](https://next-intl-docs.vercel.app/) provides internationalization (i18n) support for Next.js applications.  
It enables you to easily manage translations, locale-based routing, and formatting for dates, numbers, and messages.  
With next-intl, you can build multi-language apps with automatic locale detection and seamless language switching.

## ESLint & Code Quality

The project uses ESLint with recommended and type-aware rules, including [`eslint-plugin-sonarjs`](https://github.com/SonarSource/eslint-plugin-sonarjs) for detecting code smells and improving maintainability. You can expand the configuration in `eslint.config.js` for stricter or stylistic rules. For React-specific linting, consider adding `eslint-plugin-react-x` and `eslint-plugin-react-dom`.

## Tailwind CSS

Tailwind is included for utility-first styling. See `src/tailwind.css` for the base setup. You can remove unused SCSS and migrate styles to Tailwind classes for consistency.

## Prettier

[Prettier](https://prettier.io/) is an opinionated code formatter that enforces consistent style for your codebase. It automatically formats your code on save or via command line, reducing code review overhead and avoiding style debates.

### Usage

- Run formatting manually:
  ```sh
  npm run format
  # or
  yarn format
  ```
- Integrated with Husky and lint-staged to auto-format code before commit.

### Plugins

- `prettier-plugin-organize-imports`: Automatically sorts and groups import statements.
- `prettier-plugin-organize-attributes`: Organizes JSX/HTML attributes for readability.
- `prettier-plugin-tailwindcss`: Sorts Tailwind CSS classes for consistency and purging.

Prettier helps keep your codebase clean, readable, and easy to maintain.

## Commitlint

[Commitlint](https://commitlint.js.org/) checks that your commit messages meet conventional standards, helping maintain a clean git history. The configuration is in `commitlint.config.cjs`.

## Husky

[Husky](https://typicode.github.io/husky/) is used to manage git hooks. It runs checks (like linting and commit message validation) automatically before commits and pushes, ensuring code quality and commit standards are enforced.

## E2E Testing with Robot Framework

This project includes end-to-end (E2E) tests using [Robot Framework](https://robotframework.org/), a powerful automation framework for acceptance testing and robotic process automation.

### Structure

- `.e2e/requirements.txt`: Python dependencies for E2E tests
- `.e2e/integration/`: Main integration test suites (`*.robot`)
- `.e2e/keywords/`: Reusable keyword libraries, organized by feature
- `.e2e/testcases/`: Individual test cases
- `.e2e/result/`: Test results, logs, screenshots, and reports

### How to Run E2E Tests

1. **Install Python dependencies**

```sh
npm run setup
# or
pip install --no-cache --break-system-packages -r ./.e2e/requirements.txt
```

2. **Run all E2E tests**

```sh
npm run e2e
# or
robot -d .e2e/result .e2e/integration/*.robot
```

3. **View results**

- Open `.e2e/result/report.html` and `.e2e/result/log.html` for detailed test reports and logs.

### Notes

- Test cases and keywords are organized for maintainability and reuse.
- Screenshots and traces are saved for debugging failed tests.
- You can add new test cases in `.e2e/testcases/` and keywords in `.e2e/keywords/`.

## License

---

> 🚀 **Happy coding!**  
> Keep learning, keep building, and enjoy every moment of your development journey.  
> Remember: Great products are built one commit at a time.  
> You got this! 💪
