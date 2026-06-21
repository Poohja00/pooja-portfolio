# Pooja Mahapatra — Portfolio

Personal portfolio site for **Pooja Mahapatra** — HR Professional, Talent Acquisition specialist, and former software tester.

**Live:** https://poohja00.github.io/pooja-portfolio/

## Highlights

- Bright, editorial design (Fraunces serif + Inter) inspired by cofounder.co
- A **live sourcing dashboard** that reads only non-PII columns from Google Sheets via the `gviz` query API
- **Pipeline Snake** — a small canvas game in the nav
- Smooth scroll reveals and micro-interactions

## Tech stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Deployment

Pushes to `main` are built and published to GitHub Pages automatically via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
