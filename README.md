# IRIS permanent makeup website demo

Local Next.js, TypeScript, and Tailwind project. Business details and treatment availability still require studio confirmation as noted in the page; imagery is an original AI-generated campaign concept.

The design includes cream and espresso themes, a persistent theme preference with system-theme support, scroll reveals, image entrance and hover transitions, animated navigation and buttons, an accessible FAQ accordion, and a mobile booking bar. Reduced-motion preferences disable animation, and a pause control stops the decorative loops. Phone layouts use full touch targets and safe-area spacing.

The four compressed campaign images are in `public/images/`. Their provenance and complete generation prompts are recorded in `public/images/ASSETS.md`. These are illustrative images, not photographs of real clients, treatment results, or the studio.

The client review pass uses 17px paragraph copy, 15px actions/navigation, and 14px supporting text with improved contrast and spacing in both themes. The mobile booking bar appears when the page’s booking buttons are out of view. Responsive checks and the finishing-pass record are in `artifacts/READABILITY-QA.md`.

## Run locally

Use Node.js 20 or newer and pnpm:

```sh
pnpm install
pnpm dev --hostname 127.0.0.1
```

Open http://127.0.0.1:3000.

## Verify

```sh
pnpm run typecheck
pnpm run build
```

To preview a production build locally, run `pnpm start` after building.

Development writes generated files to `.next-dev`; production builds write to `.next`. This keeps building the project from overwriting the chunks used by a running local preview. After changing `next.config.mjs` or installing a new Next.js version, restart the preview server.

## Download and GitHub handoff

The downloadable project contains the app, configuration, dependency lockfile, local images with provenance, and review notes. Dependencies, build caches, account credentials, and synced ChatGPT reference files are not included. Extract the ZIP, open the `iris-pmu-website` folder, and follow the local run instructions above.

To publish the source to GitHub, choose a repository you own and authenticate through GitHub's sign-in flow. Do not paste passwords or access tokens into a chat. A GitHub plugin connection and local Git push authentication may be separate; the available workflow must be checked after connecting. No GitHub repository has been created or pushed as part of this download handoff.

## Deployment handoff

The standard Next.js build command is `pnpm run build` and production output remains `.next`. Import this folder into Vercel only when deployment is requested. No account connections or publication have been made.
