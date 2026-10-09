import type { MetadataRoute } from "next";
import { isPublicProduction, siteUrl } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return isPublicProduction
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl.origin}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
