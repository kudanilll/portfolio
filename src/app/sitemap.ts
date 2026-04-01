import type { MetadataRoute } from "next";
import {
  getLanguageAlternates,
  getLocalizedUrl,
  locales,
} from "@/common/seo-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.map((lang) => ({
    url: getLocalizedUrl(lang),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: getLanguageAlternates(),
    },
  }));
}
