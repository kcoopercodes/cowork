# Charm City Cowork

A Baltimore workspace guide for finding cafés, coworking spaces, and other places to work. The text-first directory includes search, neighborhood and amenity filters, menu details, and a place suggestion form.

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Project notes

- React 19, TypeScript, and Vite
- Listing content is sample data in `App.tsx`; verify business details before publishing them.
- Search, filters, sorting, workspace details, and the suggestion form run in the browser. Suggestions are not shared or published until a backend is connected.
- Listing photos are venue-specific images embedded from venue, architecture, and local publication pages.
- Google Fonts are loaded from Google Fonts.

## Deployment

The project includes Vercel configuration and can be deployed as a Vite application. Configure the deployment project to run `npm run build` and serve the generated `dist` directory.
# cowork
