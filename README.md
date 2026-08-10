# Pilip Yom — Portfolio

A modern, responsive portfolio built with **React + Vite**. Dark/light theming, scroll-reveal animations, animated skill bars, count-up stats and a working contact form backed by a Vercel serverless function.

## 🚀 Getting started

```bash
npm install     # install dependencies
npm run dev     # start the dev server at http://localhost:5173
npm run build   # production build into dist/
npm run preview # preview the production build locally
```

## 📁 Project structure

```
├── api/
│   └── contact.cjs          # Vercel serverless function (sends contact emails)
├── public/
│   ├── images/              # static images served from /images/...
│   └── Pilip_Yom_CV.pdf     # downloadable CV
├── src/
│   ├── components/          # React components (one per section)
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── SectionHeading.jsx
│   │   └── index.js         # barrel export
│   ├── data/                # all site content, split by section
│   │   ├── nav.js
│   │   ├── hero.js
│   │   ├── about.js
│   │   ├── skills.js
│   │   ├── projects.js
│   │   ├── experience.js
│   │   ├── contact.js
│   │   ├── site.js          # global constants (e.g. CV path)
│   │   └── index.js         # barrel export
│   ├── hooks/               # reusable React hooks
│   │   ├── useTheme.js      # dark/light theme with localStorage
│   │   ├── useInView.js     # IntersectionObserver reveal
│   │   ├── useCountUp.js    # animated number counting
│   │   ├── useTypewriter.js # hero typewriter effect
│   │   └── index.js         # barrel export
│   ├── styles/              # CSS split by concern
│   │   ├── tokens.css       # design tokens (colors, shadows, fonts)
│   │   ├── base.css         # reset, elements, buttons
│   │   ├── layout.css       # header, navigation, footer
│   │   ├── sections.css     # hero → contact styles
│   │   ├── responsive.css   # breakpoints & reduced motion
│   │   └── index.css        # imports all CSS in cascade order
│   ├── utils/
│   │   ├── contactApi.js    # resolves the contact API URL
│   │   └── index.js         # barrel export
│   ├── App.jsx              # composes all sections
│   └── main.jsx             # React entry point
├── index.html               # Vite entry (mounts the React app)
├── vite.config.js           # Vite config + @ path alias
└── jsconfig.json            # editor support for the @ alias
```

## ✏️ Editing your content

All text lives in `src/data/`. To update:

- **Bio & stats** → `src/data/about.js`
- **Skills & levels** → `src/data/skills.js`
- **Projects & links** → `src/data/projects.js`
- **Experience timeline** → `src/data/experience.js`
- **Contact info & socials** → `src/data/contact.js`

## 🎨 Theming & design tokens

Colors, shadows, radii and fonts are defined once as CSS variables in `src/styles/tokens.css`. The dark/light theme is controlled by the `data-theme` attribute on `<html>`, managed by the `useTheme` hook.

## 📬 Contact form

The form posts to `/api/contact` (Vercel serverless function in `api/contact.cjs`). Set these environment variables on Vercel:

| Variable | Description |
| --- | --- |
| `GMAIL_USER` | Gmail address used to send messages |
| `GMAIL_APP_PASSWORD` | Gmail app password |
| `RECIPIENT_EMAIL` | Where to receive messages (defaults to `GMAIL_USER`) |
