import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";

const settings = (env: Record<string, string>) => JSON.parse(execFileSync(process.execPath,
  ["--input-type=module", "-e", "const s = await import('./src/data/site.ts'); console.log(JSON.stringify({ origin: s.siteUrl.origin, public: s.isPublicProduction }));"],
  { env: { ...process.env, SITE_URL: "", VERCEL_URL: "", VERCEL_ENV: "", ...env }, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
));

test("only a configured production origin enables indexing and analytics", () => {
  expect(settings({ NODE_ENV: "production" }).public).toBe(false);
  expect(settings({ SITE_URL: "https://portfolio.example", NODE_ENV: "development" }).public).toBe(false);
  expect(settings({ SITE_URL: "https://portfolio.example", NODE_ENV: "production", VERCEL_ENV: "preview" }).public).toBe(false);
  expect(settings({ SITE_URL: "https://portfolio.example", NODE_ENV: "production", VERCEL_ENV: "production" })).toEqual({ origin: "https://portfolio.example", public: true });
  expect(settings({ NODE_ENV: "production", VERCEL_URL: "portfolio-preview.vercel.app" }).origin).toBe("https://portfolio-preview.vercel.app");
});

test("invalid production origins fail clearly rather than generating broken metadata", () => {
  for (const url of ["not-a-url", "http://portfolio.example", "https://portfolio.example/path", "https://user:password@portfolio.example", "https://portfolio.example?query=1", "https://portfolio.example#fragment"]) {
    expect(() => settings({ SITE_URL: url, NODE_ENV: "production" })).toThrow();
  }
});
