import type { MetadataRoute } from "next";
import { isPublicProduction, siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return isPublicProduction ? [{ url: siteUrl.origin }] : [];
}
