# ZJK Monorepo

This monorepo is where I will work on any front/backend work that is applicable
to a Nx workspace monorepo.

## Getting Started

2. Have LTS of [NodeJS](https://nodejs.org/en) installed on your device
1. Clone the repo locally onto your device
1. Run `npm install` inside the repo

## Current list of apps available:

- [AniWatching](https://aniwatching.com/) (`ani-watching`)
  - `npm start:ani-watching`
  - Will auto deploy on merge to `main` with Firebase
  - Mostly uses the `ani-watching` and `ani-list` library scopes.

> More will hopefully be converted over to here in the future from my various
> standalone repos. Anything new from my personal work will also go inside this
> repo.

## Primary list of Tools/Package used:

- [Nx](https://nx.dev/) - monorepo orchestrator / tooling
- [Angular](https://angular.io/) - web framework of choice
- [Prettier](https://prettier.io/) - formatting
- [ESLint](https://eslint.org/) - linting
- [Cypress](https://www.cypress.io/) - e2e tests
- [Jest](https://jestjs.io/) - unit tests
- [Firebase](https://firebase.google.com/) - mostly for hosting
- [Github Actions](https://github.com/zjkipping/zjk-monorepo/actions) - CI
  workflows
- [VSCode](https://code.visualstudio.com/) - "light-weight" text editor
