# AAXT

The complete web stack including AdonisJS AlpineJS htmlX and Tailwind.

## Features

- Alpine, HTMX and Tailwind pre-installed and configured
- AdonisJS middleware to automatically send HTML fragments for HTMX requests
- Same URL for whole page vs required fragments
- Server (using [Bentocache](https://bentocache.dev)) and Browser (using ETag) caching enabled by default
- HTMX extension `no-load` to not request current page
- Edge templating engine
- Selectively cache requests

## Usage

To create a new AAXT project run:

```bash
npx degit craigharman/aaxt my-new-project
cd my-new-project
npm i
cp .env.example .env
npm run dev
```

## Docs

Further documentation is available at [https://aaxt.mrmasonic.com/docs](https://aaxt.mrmasonic.com/docs).
