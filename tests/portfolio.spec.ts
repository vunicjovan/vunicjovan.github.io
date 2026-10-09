import { test, expect } from "@playwright/test";
import { projects, experience, profile, skillGroups } from "../src/data/portfolio";

test.beforeEach(async ({ context }) => {
  await context.route("https://cloud.umami.is/**", (route) => route.abort());
});

test("all content is readable without JavaScript, including native disclosures", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  await context.route("https://cloud.umami.is/**", (route) => route.abort());
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.locator("#projects article")).toHaveCount(projects.length);
  await expect(page.locator("#experience ol > li")).toHaveCount(experience.length);
  await expect(page.locator("#contact a[href^='mailto:']")).toHaveAttribute("href", `mailto:${profile.email}`);
  await page.getByText("A few languages, beyond programming").click();
  await expect(page.getByText("Serbian", { exact: true })).toBeVisible();
  await page.getByText("Explore the full toolkit").click();
  await expect(page.locator(".toolkit-category")).toHaveCount(skillGroups.length);
  await expect(page.locator(".toolkit-category .tag-list li")).toHaveCount(120);
  await expect(page.locator(".toolkit-category").getByText("MCP Servers", { exact: true })).toBeVisible();
  await context.close();
});

test("navigation, project links and keyboard access work", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  for (const [label, hash] of [["Projects", "projects"], ["Experience", "experience"], ["Expertise", "expertise"], ["Let's talk", "contact"]]) {
    await page.getByRole("navigation").getByRole("link", { name: label }).click();
    await expect(page).toHaveURL(new RegExp(`#${hash}$`));
  }
  for (const project of projects) {
    const link = page.locator(`#projects a[href='${project.github}']`);
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  await expect(page.getByRole("img", { name: profile.name })).toBeVisible();
  await expect.poll(() => page.getByRole("img", { name: profile.name }).evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  expect(errors).toEqual([]);
});

for (const width of [320, 375, 640, 768, 1280]) {
  test(`layout fits a ${width}px viewport, including expanded content`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    for (const expanded of [false, true]) {
      if (expanded) {
        await page.getByText("Explore the full toolkit").click();
        await page.getByText("A few languages, beyond programming").click();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
    await page.getByRole("navigation").getByRole("link", { name: "Projects", exact: true }).click();
    await expect(page).toHaveURL(/#projects$/);
    await expect.poll(() => page.locator("#projects").evaluate((element) => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0);
  });
}

test("reduced motion disables smooth scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
});

test("metadata, crawler policy, social image and 404 are served", async ({ page, request }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(`${profile.name} — Software Engineer`);
  const origin = process.env.SITE_URL || "http://localhost:3000";
  const canonical = await page.locator("link[rel='canonical']").getAttribute("href");
  expect(new URL(canonical as string).href).toBe(new URL(origin).href);
  await expect(page.locator("meta[property='og:image']")).toHaveAttribute("content", /opengraph-image/);
  const imagePath = new URL(await page.locator("meta[property='og:image']").getAttribute("content") as string).pathname;
  const image = await request.get(imagePath);
  expect(image.ok()).toBe(true);
  expect(image.headers()["content-type"]).toContain("image/png");
  const publicProduction = Boolean(process.env.SITE_URL) && (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");
  await expect(page.locator("meta[name='robots']")).toHaveAttribute("content", publicProduction ? "index, follow" : "noindex, nofollow");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain(publicProduction ? "Allow: /" : "Disallow: /");
  const sitemap = await request.get("/sitemap.xml");
  expect((await sitemap.text()).includes("<loc>")).toBe(publicProduction);
  expect((await page.content()).includes("63368fe6-d50f-47fd-a84e-a708ccc6a838")).toBe(publicProduction);
  const response = await page.goto("/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back to the portfolio" })).toHaveAttribute("href", "/");
});
