import type { MetadataRoute } from "next";
import {
  getLanguageAlternates,
  getLocalizedUrl,
  locales,
} from "@/common/seo-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Only self-canonical, HTTP 200 URLs belong here. The bare "/" is
  // deliberately absent: it 301-redirects to the negotiated locale, so
  // listing it just feeds Google a URL it can never index.
  return locales.map((lang) => ({
    url: getLocalizedUrl(lang),
    lastModified,
    alternates: {
      languages: getLanguageAlternates(),
    },
  }));
}
