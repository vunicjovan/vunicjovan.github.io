# Portfolio rebuild: repository analysis and implementation plan

**Owner:** Jovan Vunić

**Source:** [vunicjovan/vunicjovan.github.io](https://github.com/vunicjovan/vunicjovan.github.io)

**Reviewed:** 9 October 2026

**Document version:** 2.3.0 — implementation complete locally; Vercel preview and custom-domain launch pending

**Source revision:** `f572e9c8dbd88b1d27c85be34925316e805b1e92` (`main`)

**Status:** Portfolio implemented in `site/` on `rebuild/nextjs-portfolio`; local verification complete. Hosted Vercel preview requires the Vercel connection. Custom-domain selection, content review and production launch remain pending.

## 1. Recommendation and scope

Rebuild the portfolio as one statically rendered Next.js App Router page, with TypeScript, Tailwind CSS, and Vercel previews/production deployment under a new custom domain. GitHub remains the source repository; GitHub Pages is not a deployment target for the rebuild. Preserve the substance of the current site: identity, biography, four career entries, all six projects, technical expertise, spoken languages, contact preferences, profile photo, social links, and existing Umami analytics. Use ordinary section anchors and keep content available without client-side JavaScript.

The website's main job is to let a recruiter, engineering colleague, or potential collaborator quickly understand Jovan's focus, see evidence of his work, and contact him. Lead with senior engineering experience and backend/data work, rather than a long wall of technology badges.

Next.js is a reasonable continuation of the supplied specification, but it is not required to make a portfolio modern. MkDocs already generates static HTML; changing frameworks does not automatically improve performance or design. A plain static site would also work. Retain the proposed stack for this plan, while keeping its runtime and dependencies minimal.

The source was cloned into `/tmp/vunicjovan-portfolio-source` for inspection. The workspace root has a reserved `.git` directory and is not a working checkout. Implementation now lives in the real `site/` checkout, preserving the original repository history and GitHub origin. Run application commands from `site/`; Vercel’s root directory is `.` within the imported repository.

## 2. What the repository actually contains

The `main` branch has 19 tracked files. There are no repository-specific `AGENTS.md` instructions, JavaScript application, tests, README file, project screenshots, resume PDF, backend, database, or contact form. The remote also contains `gh-pages`, which holds generated output rather than source. The latest reviewed `main` commit was made on 13 March 2026.

| File or group | Role and findings | Migration action |
| --- | --- | --- |
| `portfolio/docs/index.md` | Greeting, master's degree, engineering since 2019, personal interests, photo, GitHub and LinkedIn | Hero and about content |
| `portfolio/docs/experience.md` | Professional summary, current role, four-job timeline, work interests, eight spoken languages | Explicit experience section; languages in about/details |
| `portfolio/docs/projects.md` | Six projects, descriptions, technologies, repository URLs; tabs group two active, three completed, one published tool | Preserve all six and their distinctions |
| `portfolio/docs/skills.md` | Thirteen top-level expertise/tool categories, many nested tabs | Compact overview with complete inventory available in native disclosure elements |
| `portfolio/docs/contact.md` | Vienna location, onsite/hybrid/remote preferences, travel, email/social contacts | Visible contact section |
| `portfolio/docs/assets/images/vj.png` | Existing circular portrait, 1543 × 1543 PNG, approximately 472 KiB | Reuse; optimize delivery and set dimensions |
| `portfolio/docs/assets/images/favicon.png` | 32 × 32 RGBA PNG | Reuse as the initial favicon |
| `portfolio/mkdocs.yml` | Material theme, light/dark toggle, navigation, search, fonts, Markdown extensions, timeline support | Replace with page/layout metadata, navigation, styles; remove documentation search |
| `portfolio/overrides/main.html` | Adds Umami Cloud script to the theme | Preserve analytics intentionally in the new layout |
| `portfolio/docs/stylesheets/extra.css` | 1,133 lines of theme overrides, animations, responsive styles and repeated selector definitions | Replace with a small stylesheet and Tailwind; reuse visual cues, not the theme override machinery |
| `portfolio/docs/css/neoteroi-mkdocs.css` | 199 lines for the timeline | Replace with a semantic ordered list and simple CSS |
| `.github/workflows/deploy.yaml` | Every push to `main` installs pinned Python requirements and runs `mkdocs gh-deploy --force`; token can write repository contents | Keep during preview work; replace/remove at production cutover |
| `pyproject.toml`, `uv.lock` | Python ≥3.13 project with MkDocs, Material and Neoteroi; 40 lock entries including the root project | Remove after migration; no Python runtime required |
| `portfolio/requirements.txt` | Pinned deployment dependency set; CI uses this instead of `uv.lock` | Remove with the old build |
| `.gitignore` | Python/virtual environment/editor exclusions | Add Node, Next.js and local environment exclusions; remove obsolete entries as appropriate |
| `.gitattributes` | LF line endings | Keep |
| `.markdownlint.json` | Allows inline HTML and long lines | Keep if useful for repository documentation |
| `LICENSE` | Copyright 2026 Jovan Vunić, all rights reserved | Preserve; do not replace with a permissive template license |

### Verified deployment and existing weaknesses

- Generated branch revision: `6fa9e93f316f2e764bc83160b55798a654d0092c`; its commit records deployment of `f572e9c` with MkDocs 1.6.1.
- The live homepage returned HTTP 200 and its downloaded HTML matched the generated homepage byte-for-byte. It includes the existing Umami website ID.
- Generated routes are `/`, `/experience/`, `/projects/`, `/skills/`, `/contact/`, and a `404.html` page. These describe the old site; retaining its address and deep links is not a launch requirement under the owner’s clarified scope.
- `site_url` is absent from MkDocs configuration. The generated sitemap is an empty `<urlset>` and the five generated content pages have no canonical link. The new site must set a real production origin and generate useful metadata.
- The generated skills page alone is approximately 178 KB of uncompressed HTML, much of it icon markup. Use readable text categories instead of reproducing an icon for every tool.
- Existing CSS enables continuous glow/floating animations and smooth scrolling without `prefers-reduced-motion` handling. The new design must respect that preference.
- Styling hides first-page `h1` elements globally and adapts documentation-theme internals with many overrides. The new page should have an explicit visible `h1` and ordinary semantic sections.
- `pyproject.toml` references a missing `README.md`; local project metadata and CI also take separate dependency paths. These are cleanup observations, not reasons to repair the old Python application before replacing it.
- The unauthenticated Pages settings API returned HTTP 404, so the dashboard's actual Pages source, HTTPS settings and domain configuration were not verified. The live site's availability was verified separately.

These are source/output observations, not a browser accessibility or performance audit. No claim is made that the current site fails a particular Lighthouse score.

## 3. Content migration inventory

Treat all role dates, availability statements and project statuses below as **existing source claims**, not independently verified current facts. Review them before launch. Improve grammar and shorten repetitive prose without inventing job outcomes, education dates, proficiency levels, project usage figures, or production deployments.

### Identity, biography and contact

- Name: **Jovan Vunić**. Preserve Unicode spelling throughout metadata and UI.
- Qualification: **M.Sc. in Applied Computer Science and Informatics**. No university name or graduation date is provided.
- Engineering since 2019; interests include books, coffee, travel and other cultures.
- Existing positioning: senior full-stack engineer with a backend focus; adaptable, communicative, interested in scalable/platform-independent solutions, automation and data.
- Location: **Vienna, Austria**.
- Existing availability: onsite/hybrid in Vienna/Austria, remote worldwide, occasional travel.
- Email: `vunicjovan@gmail.com` via `mailto:`.
- GitHub: `https://github.com/vunicjovan`.
- LinkedIn: `https://www.linkedin.com/in/jovan-vuni%C4%87-m-sc-4851091a9/`. Preserve the encoded URL unless a replacement is verified.
- Spoken languages: Serbian native; Bosnian, Croatian, Montenegrin and English professional; German advanced; Italian and Spanish beginner. Present as text, not flags alone.

### Career history

| Employer | Role | Dates | Location |
| --- | --- | --- | --- |
| Adverity | Senior Full-Stack Engineer (Back-End Focused) | November 2025–Present | Vienna, Austria |
| Allianz Technology | Java Developer / Lead Python Developer | August 2022–October 2025 | Vienna, Austria |
| ALAS | Software Engineer | January 2021–June 2022 | Novi Sad, Serbia |
| INVT | Junior Software Engineer | August 2019–December 2020 | Novi Sad, Serbia |

The source supplies titles, dates and locations, but no per-role achievements. Render those facts cleanly; add achievement bullets only if the owner supplies them. Do not extrapolate uninterrupted employment from “since 2019.”

### Projects

| Project | Existing category | Description to preserve | Source technologies | Repository |
| --- | --- | --- | --- | --- |
| Bimmer | Actively developed / in progress | Monolithic vehicle rental/sale advertisement platform, potentially expandable to other categories | Python, Django, DRF, React, TypeScript, PostgreSQL, Docker, Just | [bimmer](https://github.com/vunicjovan/bimmer) |
| A Rose By Any Name | Actively developed / in progress | Hobby overview of books read over past years | Python, Rio, TinyDB, UV | [rose-by-any-name](https://github.com/vunicjovan/rose-by-any-name) |
| XWS | Completed / university team project | Rent-a-car platform with 10+ microservice applications and a separate client; RabbitMQ messaging and SOAP exchanges | Java, Spring Boot, Vue.js, Docker, Maven, PostgreSQL, RabbitMQ | [xws](https://github.com/vunicjovan/xws) |
| Weather HTTP Server | Completed / proof of concept | REST weather data for cities; research into standalone servers using Python's standard library | Python, `http.server` | [weather-http-server](https://github.com/vunicjovan/weather-http-server) |
| Simple PyTorch Workflow | Completed / demonstration | Synthetic data, train/test split, training, save/load and Matplotlib visualization | Python, UV, PyTorch, Matplotlib | [simple-pytorch-workflow](https://github.com/vunicjovan/simple-pytorch-workflow) |
| Kombat | Published tool; marked completed | Filesystem hierarchy analysis: aggregate size, timestamps, permissions, MIME types, SHA256 duplicate detection; interactive HTML, JSON and CSV exports | Python, UV | [kombat](https://github.com/vunicjovan/kombat) |

There are no live demo URLs, screenshot assets or package registry URLs in the portfolio source. Do not create demo buttons or imply Kombat's package publication was independently checked. A sensible initial order is Bimmer, Kombat, A Rose By Any Name, XWS, Weather HTTP Server, Simple PyTorch Workflow; this is an editorial recommendation, not an assertion of popularity. All six remain accessible.

### Complete expertise inventory

Keep this inventory in content data. Show a concise selection first, then expose the remaining items through native `<details>` sections. Do not turn breadth into unsupported claims of expert-level proficiency in every listed tool.

| Source category | Items |
| --- | --- |
| Areas of expertise | Back-End Development, Full-Stack Development, Data Engineering, Data Analysis, Data Science, Machine Learning, High Performance Computing, Microservices, Process Automation, Architectural Patterns, Scripting |
| Programming languages | Python, Java, JavaScript, TypeScript, Go, R, C++ |
| Backend | Python: Django, Django REST Framework, FastAPI, Flask, Quart, SQLAlchemy, Alembic, Pydantic, Asyncio, Jinja2; Java: Spring Boot, Quarkus, Hibernate, JPA, JavaFX; Go: Gin, Echo, GORM; Node.js: Express.js, Socket.io |
| Frontend | React.js, Redux, Vue.js, Vuex, TypeScript; HTML/CSS, SASS/SCSS, Tailwind CSS, Quasar |
| Full stack | Django + React, FastAPI + Vue.js, Spring Boot + Vue.js, Node.js Stack, Rio, Gradio, NiceGUI |
| Event-driven development | Apache Kafka, Apache Spark, RabbitMQ, Celery |
| Data analysis and visualization | Pandas, Polars, Matplotlib, Streamlit, Dash, Jupyter |
| Data science and machine learning | Scikit-Learn, Neural Networks, Joblib; PyTorch, TensorFlow, Keras, OpenCV; NLTK, spaCy, TextBlob, NLP Pipelines |
| Generative AI | Claude Code, Windsurf, GitHub Copilot, OpenAI GPT, Google Gemini, MCP Servers |
| Databases and search | PostgreSQL, MySQL, SQLite, IBM DB2; Elasticsearch, Solr |
| Cloud and DevOps | Amazon Web Services (AWS), Google Cloud Platform, Oracle Cloud, Heroku, Streamlit Cloud; Docker, Docker Hub, Docker Compose, Kubernetes; GitHub Actions, GitLab CI/CD, Jenkins, Travis CI; Make, Just, Pre-Commit; Sentry, Grafana, Kibana; Ruff, TY, Black, isort, mypy, Prettier |
| Version control | Git, GitHub, GitLab, SVN |
| Documentation | Notion, Confluence, MkDocs, GitHub Pages |

The thirteen rows preserve all thirteen top-level source categories, including their nested groups. Items repeated across source categories may remain repeated in the data where they convey context.

## 4. Changes to the original Gemini plan

1. **Add experience and contact as first-class sections.** The earlier component list dropped the career timeline and treated contact mostly as footer/social links.
2. **Keep analytics.** The existing Umami integration was omitted.
3. **Correct hosting/domain assumptions.** You cannot set DNS for `vunicjovan.github.io` to point at Vercel. The owner has confirmed a new custom domain and Vercel hosting; retaining the old address is not required.
4. **Render the page statically.** “Single page” describes the layout; it does not require a client-rendered SPA or JavaScript for navigation/content.
5. **Avoid unneeded packages.** No initial MDX pipeline, Framer Motion, `clsx`, `tailwind-merge`, state library, CMS or icon library. Simple strings, CSS and text links suffice. Add a dependency only for a demonstrated implementation need.
6. **Use current setup conventions.** Do not pin the project to “Next.js 14+” or require a `tailwind.config.ts` copied from older Tailwind instructions. Recheck supported stable Next.js/React, Node LTS and Tailwind versions when implementation starts, then commit a lockfile. Current Tailwind documentation uses its PostCSS plugin and CSS import approach. [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [Tailwind with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs).
7. **Keep file structure proportional.** Co-locate content types with the data; do not add global `types/`, duplicate social-data files or two favicons without a need.
8. **Replace the old deployment workflow deliberately.** Simply pushing a new application to `main` would also trigger the old Python deployment job.
9. **Keep rollback, simplify migration.** Preserve the old source/deployment revisions, but omit GitHub Pages forwarding pages and legacy route compatibility unless separately requested.
10. **Treat Lighthouse as measured evidence.** Target ≥90 in each category on a production build, record conditions and investigate regressions; framework choice alone cannot guarantee scores.

## 5. Proposed page and visual direction

Use a restrained dark navy baseline with blue accents, drawing on the current identity. Introduce a stronger type hierarchy, comfortable reading width, generous spacing and readable cards. A modern result should come from composition and typography rather than continuous glow effects. This is a proposed design direction, not a selected mockup.

| Order | Section | Essential behavior |
| --- | --- | --- |
| 1 | Header | Name/monogram and anchors to projects, experience, expertise, contact; links wrap on mobile to avoid a JavaScript menu initially |
| 2 | Hero | Visible `h1`, name, current focus, Vienna, portrait, “View projects” and “Get in touch” links |
| 3 | About (`#about`) | Short biography, master's qualification, personal interests; spoken languages in a compact disclosure/list |
| 4 | Projects (`#projects`) | Six readable cards, category/status in text, short descriptions, stack, repository link; no filter needed for six entries |
| 5 | Experience (`#experience`) | Four-entry semantic timeline, role/employer/dates/location; current role also appears in hero |
| 6 | Expertise (`#expertise`) | Backend/full-stack/data focus first; grouped complete inventory in accessible disclosures |
| 7 | Contact (`#contact`) and footer | Visible email, LinkedIn, GitHub and location/work preferences; simple copyright |

Native anchor navigation, `scroll-margin-top` for the sticky header, skip link, visible focus states, meaningful link names, proper headings, contrast and reduced-motion styles are baseline requirements. No information appears only on hover. Keep all essential content readable with JavaScript disabled. Use system light/dark preference through CSS if retaining both schemes; omit a manual theme toggle initially unless requested.

Reuse the portrait and favicon. Set portrait width/height and responsive sizes to avoid layout shift; on Vercel use Next.js image delivery if useful. No placeholder project screenshots, invented logos, resume download, or generated decorative imagery are needed. A social preview graphic can be generated from styled text without an image-generation service.

## 6. Minimal application structure

```text
public/
  images/vj.png
src/
  app/
    layout.tsx                 # metadata, lang, fonts and production analytics
    page.tsx                   # statically rendered section composition
    globals.css                # Tailwind import, tokens, focus/reduced motion
    icon.png                   # existing favicon, one source
    sitemap.ts
    robots.ts
    opengraph-image.tsx         # generated branded social preview
    not-found.tsx
  components/
    Header.tsx
    Projects.tsx               # card markup can stay here
    Experience.tsx
    Expertise.tsx
  data/
    portfolio.ts               # profile, links, jobs, projects, skill groups
    site.ts                    # production URL and indexing/analytics policy
package.json
package-lock.json
# Scaffold-required TypeScript, ESLint, PostCSS and Next.js files
.github/workflows/checks.yaml
README.md
portfolio_migration_specification.md
LICENSE
```

Keep short hero/about/contact/footer markup in `page.tsx` until extraction would improve readability. Server Components remain the default; no `use client` is needed for static content or native disclosures. Use a single local typed data module for repeated content. Project data needs a stable ID, title, description, category, status, tags and repository URL; add a demo URL only when a verified demo exists. Store role dates as explicit content, preserving “Present”; no duration calculator is needed.

Production analytics should retain `https://cloud.umami.is/script.js` and website ID `63368fe6-d50f-47fd-a84e-a708ccc6a838`, load after primary content, and exclude previews/development from production tracking. No server secret is necessary for the public script ID. Verify the new hostname in Umami's dashboard before launch; the dashboard was not inspected in this pass.

Set title, description, canonical production URL, Open Graph/Twitter metadata, `lang="en"`, a nonempty sitemap and robots policy. Keep previews out of search indexing using verified Vercel preview behavior or an explicit preview policy. The canonical origin must be the actual chosen production host, never a random preview URL.

## 7. Hosting and custom domain

**Confirmed deployment target:** Vercel, with a new owned domain. The rebuilt application will not be deployed to GitHub Pages. No Pages forwarding site, static-export hosting alternative, or legacy route redirect layer is required.

Vercel is a good fit for this small Next.js portfolio: Git integration provides branch/PR previews and production deployments from the configured production branch. Use its detected Next.js preset, repository root, package build script and default output handling. A separate Vercel deployment action is unnecessary. [Vercel Git deployments](https://vercel.com/docs/git).

### Domain shortlist

These are naming candidates, not verified availability or price quotes:

| Candidate | Recommendation |
| --- | --- |
| `vunicjovan.com` | First choice for a general professional identity; matches the existing GitHub username |
| `vunicjovan.dev` | Good alternative if a developer-specific identity is preferred |
| `vunicjovan.io` | Suitable if preferred; compare actual renewal cost against the other candidates |
| `jovanvunic.com` | Alternative if given-name-first spelling feels more natural |

Select one primary domain; buying multiple extensions is unnecessary. Compare registration **and renewal** prices and any premium-domain pricing before purchase. Availability must be checked with a registrar at selection time. Domain registration is a separate recurring expense from application hosting.

Buy through Vercel or another registrar. An external registrar can keep managing DNS; moving nameservers is not required for this ordinary apex/`www` setup. Add the domain in Vercel project settings and use the exact DNS records the dashboard provides rather than hardcoded example values. Configure both apex and `www`, choose one canonical hostname, redirect the other, and verify HTTPS. [Vercel custom domain setup](https://vercel.com/docs/domains/working-with-domains/add-a-domain).

Build and review on Vercel's assigned `*.vercel.app` URL first. Attach the chosen domain for launch, then update canonical metadata, sitemap, social preview URLs and Umami hostname settings. Update public profile links to the new address. Unknown routes should return a helpful real 404.

### Hosting plan

Vercel Hobby is free and intended for personal, non-commercial projects. Start there if this portfolio fits those terms; use an appropriate paid plan if its use becomes commercial or its resource needs exceed the included limits. Do not add a paid plan merely to host a custom domain. [Vercel Hobby plan](https://vercel.com/docs/plans/hobby), [custom domain support](https://vercel.com/docs/domains/working-with-domains/add-a-domain).

### Existing website

Leave the old live website unchanged while the rebuild is reviewed. Remove its MkDocs deployment workflow from the migrated application repository so future pushes deploy through Vercel only. The old published Pages artifact may remain temporarily; disabling the old site is a separate retirement decision after the new domain works. The owner explicitly accepts ignoring existing inbound traffic. Old-host redirects, legacy URL preservation and search-ranking transfer are out of scope; they are not launch checks or migration blockers.

## 8. Implementation sequence and completion gates

### Phase 1 — establish a safe working branch and decisions

- Create a real checkout of the existing repository and a rebuild branch; preserve history and record the reviewed source/deployment revisions.
- Bring this updated specification into that checkout. Keep the live MkDocs site unchanged while building previews.
- Select the custom domain, review visual direction, and confirm stale source facts. These are content/deployment decisions, not reasons to block scaffolding.
- Confirm GitHub/Vercel/Umami access when needed. A custom domain requires access to its DNS provider; do not assume one exists.

**Gate:** implementation branch, preserved source, agreed deployment path and content review list.

### Phase 2 — scaffold and migrate content

- Scaffold the current stable Next.js App Router/TypeScript/Tailwind application at the checkout root. If the initializer requires an empty directory, scaffold temporarily and copy only application files into the checkout, preserving `.git`, license and specification.
- Choose one package manager (npm is sufficient), commit its lockfile and align local, CI and Vercel Node versions with a supported compatible LTS release.
- Migrate every inventory item to `portfolio.ts`; copy existing portrait/favicon; preserve exact contact and repository URLs.
- Keep source Markdown available during content comparison, then remove the obsolete Python/MkDocs files in the completed migration change. Git history remains the archive.

**Gate:** reproducible application build and reconciled content inventory; no fabricated links, claims or assets.

### Phase 3 — implement the page and metadata

- Build the complete page from hero through contact, with responsive layouts and accessible navigation.
- Apply the proposed visual design; use CSS for simple interactions and reduced motion.
- Add metadata, social preview, sitemap, robots and 404 handling; use the chosen production origin.
- Restore production-only Umami tracking without making content depend on the script.

**Gate:** reviewable desktop/mobile page with all migrated content and working contacts.

### Phase 4 — verify and preview

- Run clean dependency installation, ESLint, TypeScript checking and the production build. Use the installed ESLint CLI rather than assuming `next lint` exists.
- Add one small browser smoke suite for essential content counts, section navigation, disclosures, contact links and 404 behavior; exercise any added interactive behavior. Avoid snapshot tests for every component.
- Manually check 320/375 px phones, 768 px tablet and 1280+ px desktop, keyboard navigation, reduced motion, text zoom and JavaScript-disabled content.
- Check external project/social links for actual destination availability before launch; no recursive audit of each project's codebase is required.
- Review a Vercel preview; verify no production analytics events or unwanted indexing, correct image loading, no hydration errors and metadata.
- Measure Lighthouse on the production build, aim for ≥90 Performance/Accessibility/Best Practices/SEO, and record actual scores and environment.

**Gate:** checks pass and the owner can review a concrete preview before production cutover.

### Phase 5 — cut over and verify production

- Configure the production Vercel project and chosen hostname; test HTTPS and apex/`www` redirects. Recheck Umami hostname settings.
- In the completed migration change, remove the MkDocs deployment workflow, finish removal of Python/theme files, update ignore rules, and add a concise README for editing content, running checks and deployment/rollback.
- Publish the production application on Vercel, attach the selected custom domain and verify DNS/HTTPS. Update public profile links to the new address; decide separately whether to retire the old Pages site.
- Verify the final homepage, section anchors, email/social links, sitemap/canonical/OG data, real 404s and analytics on production.
- Verify Git-driven deployment with an actual documented change if possible; do not create a meaningless production commit solely to prove deployment.

**Gate:** the new custom domain serves the verified Vercel application, public profile links are updated, and maintenance/rollback instructions are recorded.

### Rollback

Retain the reviewed source and old generated deployment revisions, or tag the source at cutover. After launch, record a known-working Vercel deployment and restore it if a subsequent release fails. Restore DNS only if domain records were changed; DNS propagation may take time and a Git revert does not restore provider settings. Keep the old source available in Git history. No new GitHub Pages deployment or forwarding infrastructure is part of rollback.

## 9. Launch acceptance checklist

- [ ] Correct name, qualification, biography and work preferences; role dates/statuses reviewed by owner.
- [ ] Four career entries and all six projects retained with accurate categories and source URLs.
- [ ] All expertise items and spoken languages remain available; primary view stays readable.
- [ ] Portrait/favicon present; no fake demo, resume, screenshot or employment metric.
- [ ] Clean install, lint, type check, production build and focused smoke checks pass.
- [ ] Responsive, keyboard, text zoom, reduced-motion and JavaScript-disabled checks pass.
- [ ] Metadata uses the final origin; sitemap includes the real page; preview indexing is controlled.
- [ ] External URLs checked; contact links work; unknown routes return 404.
- [ ] Production Umami works and preview traffic is excluded.
- [ ] Lighthouse scores recorded and significant issues resolved.
- [ ] Selected custom domain and apex/`www` redirect work over HTTPS; public profile links point to the new address.
- [ ] Old MkDocs deployment workflow removed; Vercel is the sole deployment target for the rebuild; rollback artifacts/settings retained.
- [ ] README explains content edits, local checks, deployment and rollback.

## 10. Decisions remaining before launch

1. **Domain and plan:** Choose/register the custom domain and confirm the appropriate Vercel plan. Vercel hosting is settled; no GitHub Pages deployment is planned.
2. **Content freshness:** Is Adverity still the current employer, are the two “actively developed” statuses accurate, and should existing work-availability wording remain?
3. **Presentation:** Accept the restrained navy/blue direction and system color preference, or supply another preference. No elaborate design system is required.
4. **Optional evidence:** Real role achievements, a current resume, project screenshots or verified demos could strengthen the site. Their absence does not prevent the core rebuild.

## 11. Initial analysis coverage and intentionally omitted features

No old-host redirects, legacy URL preservation, traffic migration, CMS, MDX parser, contact backend, project filtering, animation library, custom theme-state system, authentication, database or duplicate deployment platform is planned. These do not solve a current requirement.

The initial analysis reviewed all source content/configuration/style files, dependency manifests/lock structure, image assets, branch history and representative generated output, and downloaded the live homepage. It did not rebuild the old Python application, inspect private hosting/analytics settings, audit the six linked project repositories, or inspect every generated vendor bundle/source map. Browser audits and external link checks performed during implementation are recorded below. Production deployment settings, stale content and final domain behavior remain launch checks.

## 12. Implementation and verification — 9 October 2026

Implemented the agreed single-page Next.js portfolio in `site/`: navy/blue visual design, original portrait/favicon, accessible wrapping navigation, hero, about, six projects, four-entry career timeline, concise expertise overview with all thirteen categories/120 entries, language disclosure, and visible contact links. The original Python/MkDocs files and Pages deployment workflow are removed on the rebuild branch; original history, license and published site are preserved.

Added canonical/OG/Twitter metadata, a generated social preview image, crawler policy, sitemap, real 404 handling and production-only Umami tracking. A validated `SITE_URL` enables production indexing/analytics; previews and unconfigured builds remain unindexed with tracking disabled. The final local build is restored to this safe unconfigured state.

Verification evidence:

- Clean lockfile install, lint, TypeScript and static production build passed.
- Eleven focused smoke tests passed against the configured production build, with Umami requests blocked. The default unconfigured build is also checked separately.
- Browser checks cover JavaScript-disabled content, keyboard navigation, anchors, disclosures, portrait loading, 320/375/640/768/1280 px layouts, reduced motion, metadata/sitemap/robots, social image and 404 responses. The 640 CSS-pixel viewport also checks the effective layout width of a 1280px desktop at 200% browser zoom; it does not establish every browser’s text-only zoom behavior.
- Automated WCAG 2 A/AA and 2.1 AA scan: zero violations for collapsed and expanded content.
- Local Lighthouse mobile simulation: **98 Performance / 100 Accessibility / 100 Best Practices / 100 SEO**. Run against a configured example production origin with Umami requests blocked; these are local measurements, not hosted guarantees.
- All 120 source expertise entries and six source project URLs reconciled mechanically; original portrait/favicon copied byte-for-byte.
- Six project repositories and GitHub profile return HTTP 200. LinkedIn returns its automated-access block (999), so manual link verification remains.
- Production dependency audit: zero vulnerabilities. Five full-audit warnings remain in Next.js development lint dependencies; no compatible patch is offered. See `site/README.md`.

Desktop/mobile screenshots and local audit reports are saved in the workspace’s `previews/` directory. Application setup, content editing, verification and deployment/rollback instructions are in `site/README.md`.

Remaining launch work: review the presentation and source facts, connect Vercel and deploy a preview, choose/register the domain, configure production `SITE_URL` and DNS/HTTPS, confirm Umami hostname settings, and update public profile links. No old-host forwarding or traffic migration is needed.
