import { profile } from "./portfolio.ts";

const configuredUrl = process.env.SITE_URL;
export const siteUrl = new URL(
  configuredUrl || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
);

if (configuredUrl && (siteUrl.protocol !== "https:" || siteUrl.username || siteUrl.password || siteUrl.pathname !== "/" || siteUrl.search || siteUrl.hash)) {
  throw new Error("SITE_URL must be a canonical HTTPS origin, such as https://your-domain.com (no path, credentials, query or fragment).");
}

export const isPublicProduction = Boolean(configuredUrl) && process.env.NODE_ENV === "production" &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");

export const siteTitle = `${profile.name} — Software Engineer`;
export const siteDescription = "Senior full-stack engineer based in Vienna, with a back-end focus. Explore my work in software, data, and automation, and get in touch.";
