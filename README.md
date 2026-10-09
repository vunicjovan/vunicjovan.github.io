# Jovan Vunić — portfolio

A single-page portfolio built with Next.js App Router, TypeScript and Tailwind CSS. Content is rendered statically; navigation and disclosures work without JavaScript. Production hosting is Vercel with a custom domain.

## Run locally

Use Node 24 LTS (`nvm use` if you use nvm).

```bash
npm ci
npm run dev
```

Open http://localhost:3000. The application root is this checkout (`site/` within the current workspace), not the parent directory containing the planning document.

## Edit content and appearance

- `src/data/portfolio.ts`: profile, contact links, projects, career history, languages and full expertise inventory.
- `src/app/page.tsx`: hero, about, contact and footer.
- `src/components/`: navigation, projects, career timeline and expertise.
- `src/app/globals.css`: colors, typography, responsive layout, focus and reduced-motion styles.
- `public/images/vj.png` and `src/app/icon.png`: original portrait and favicon.
- `src/app/opengraph-image.tsx`: generated social preview image.

The original portfolio source is preserved in Git history at `f572e9c8dbd88b1d27c85be34925316e805b1e92`. All six projects, four career entries, spoken languages and thirteen expertise categories were migrated. Employment, availability and project status wording reflects that source; review those facts before launch.

## Verify

```bash
npx playwright install chromium
npm run check
```

On a fresh Linux CI machine, use `npx playwright install --with-deps chromium`. Tests start the production server themselves on port 3100; build first if running `npm test` separately. Checks cover content without JavaScript, keyboard/anchor navigation, native disclosures, image loading, overflow at 320/375/640/768/1280 px, reduced motion, metadata/crawler policy, social image delivery, 404s and production URL validation. GitHub Actions runs these checks on pull requests and the rebuild/main branches.

## Vercel preview and launch

1. Push the rebuild branch and import this repository into Vercel. Use the Next.js preset, root directory `.`, Node 24, and detected npm build/output settings. Use the rebuild branch for a preview; do not merge to the production branch until the preview is reviewed.
2. Review the assigned `*.vercel.app` preview. Preview/development traffic has Umami disabled and crawlers are blocked.
3. Register the selected domain, add it and its `www` variant in Vercel, and configure the precise DNS values Vercel provides. Choose one canonical hostname and redirect the other.
4. Set `SITE_URL` to the canonical HTTPS origin **in Vercel's Production environment**, for example `https://your-domain.com`. No path, query, fragment or credentials. Rebuild/redeploy after changing it. Do not use an unregistered example domain in production.
5. Verify HTTPS, metadata, `/robots.txt`, `/sitemap.xml`, the social preview and all contact/project links. Confirm the new hostname in Umami. Update GitHub/LinkedIn portfolio links.

Until `SITE_URL` is configured, even a production build stays `noindex` and analytics remain disabled. Vercel previews stay `noindex` even if the variable is configured. Local builds use `http://localhost:3000` for metadata unless explicitly configured. Umami's public website ID is retained; there are no API keys or server secrets in this application.

The old MkDocs deployment workflow has been removed. This rebuild has no GitHub Pages deployment, old-host forwarding pages, or legacy URL redirects. The old published site can remain unchanged until you decide to retire it.

## Rollback

Record a known-working Vercel production deployment. If a release fails, promote that deployment or revert the release and redeploy. DNS/provider settings require a separate rollback if changed. The old source and generated Pages branch remain in repository history; no branch history is rewritten.

## Dependency audit

`npm audit --omit=dev` reported zero vulnerabilities on 9 October 2026. The full audit reports five high-severity entries along the same `braces`/`micromatch`/`fast-glob` chain used by Next.js’s lint plugin. They affect development lint tooling, not production dependencies; the audit offers no compatible patched version. ESLint 9 is retained because the Next.js React/accessibility/import plugins do not yet declare ESLint 10 compatibility. Revisit this toolchain when compatible fixes are available; do not force an audit downgrade of the framework.

## Verification limits

The final custom domain, production Vercel/Umami settings and content freshness require launch review. Local checks do not establish production DNS or hosted performance. Domain registration and hosting plan selection are separate from this source change.
