# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Dependencies

The calculator page depends on the `@smogon/calc` engine located at `../calc/`. Initialize it with:

```bash
git submodule update --init
```

The submodule's TypeScript source is compiled for use by webpack at build time, but for type checking the site uses declaration files at `generated/calc/`. If the submodule is ever updated, regenerate them with:

```bash
./node_modules/.bin/tsc -p tsconfig.calc-gen.json
```

## Installation

```bash
npm install
```

## Pokedex Data

```bash
npm run pokedex
```

This command fetches Pokedex data and writes it to `src/data/utils/pokedex.json`.

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```bash
npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Playwright Testing

```bash
npm run playwright
```

With a local development server running, this command runs Playwright visual regression tests.

```bash
npm run playwright:update
```

This command updates the latest test snapshots in `tests/snapshots/`.

## Vitest Testing

```bash
npm run vitest
```

This command runs the Vitest unit tests.
