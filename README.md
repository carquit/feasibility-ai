# Feasibility.ai

A symposium-ready MVP for evaluating whether an AI concept is worth building. The experience combines a cinematic landing page with a working interactive feasibility-scoring demo.

## What is included

- Custom cobalt Feasibility.ai logo and favicon
- Responsive one-page website
- Interactive idea analyzer with dynamic scoring
- Premium navy, blue, and white enterprise design system with dimensional shadows
- Geist display typography with precise mono labels
- Restrained interaction feedback, score ring, progress indicators, and refined hover states
- Reduced-motion accessibility support
- Search-friendly page title, description, and semantic structure
- GitHub- and Hostinger-ready Node package

## Run locally

```bash
npm ci
npm run dev
```

## Production build

```bash
npm ci
npm run build
npm run start
```

The project requires Node.js 22.13 or newer.

## Hostinger deployment from GitHub

1. Create a new GitHub repository and upload the contents of this package to the repository root.
2. In Hostinger, create a Node.js application and connect the GitHub repository.
3. Set the install command to `npm ci`.
4. Set the build command to `npm run build`.
5. Set the start command to `npm run start`.
6. Use Node.js 22.13 or newer and deploy.
7. Point `feasibility.ai` to the Hostinger application after the first successful deployment.

## Brand assets

- Full logo: `public/logo.svg`
- Favicon / icon mark: `public/favicon.svg`

## MVP note

The current analyzer is a polished front-end feasibility simulation designed for a live product presentation. A production version can connect the interface to an AI reasoning API, persist assessments, generate reports, and support user accounts without changing the visual system.
