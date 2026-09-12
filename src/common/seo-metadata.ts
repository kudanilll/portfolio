import type { Metadata } from "next";
import { works } from "@/data/works";

export const locales = ["en", "id"] as const;

/** Must stay in sync with `defaultLocale` in src/proxy.ts. */
export const defaultLocale = "en" as const;

export type AppLocale = (typeof locales)[number];

const siteUrl = "https://achmaddaniel.nielcode.com";
const siteName = "Achmad Daniel Syahputra";
const personName = "Achmad Daniel Syahputra";
const defaultOgImage = `${siteUrl}/assets/images/og.webp`;
const profileImage = `${siteUrl}/assets/images/achmad-daniel.webp`;

const localizedSeo = {
  en: {
    locale: "en_US",
    // Lead with the full name: that is the query the old domain,
    // LinkedIn and GitHub currently win. Keep it under ~60 chars.
    title: "Achmad Daniel Syahputra | Software Engineer, Bekasi",
    description:
      "Portfolio of Achmad Daniel Syahputra, a software engineer in Bekasi, Indonesia building fast websites, Android apps and scalable backends with Next.js, Go and Flutter.",
    siteDescription:
      "Explore selected work, services, and technical expertise in web development, mobile engineering, and IoT-focused solutions.",
    keywords: [
      "Achmad Daniel",
      "Achmad Daniel Syahputra",
      "programmer",
      "software developer",
      "web developer Indonesia",
      "Flutter developer",
      "Next.js developer",
      "portfolio website",
      "software engineer portfolio",
      "IoT developer",
    ],
  },
  id: {
    locale: "id_ID",
    title: "Achmad Daniel Syahputra | Software Engineer Bekasi",
    description:
      "Portofolio Achmad Daniel Syahputra, software engineer asal Bekasi, Indonesia yang membangun website cepat, aplikasi Android, dan backend scalable dengan Next.js, Go, dan Flutter.",
    siteDescription:
      "Jelajahi proyek pilihan, layanan, dan keahlian teknis di bidang pengembangan web, pengembangan aplikasi mobile, dan solusi berbasis IoT.",
    keywords: [
      "Achmad Daniel",
      "Achmad Daniel Syahputra",
      "programmer",
      "software developer",
      "web developer Indonesia",
      "jasa pembuatan website",
      "developer Flutter",
      "developer Next.js",
      "portfolio programmer",
      "developer IoT",
    ],
  },
} satisfies Record<
  AppLocale,
  {
    locale: string;
    title: string;
    description: string;
    siteDescription: string;
    keywords: string[];
  }
>;

const socialProfiles = [
  "https://github.com/kudanilll",
  "https://www.linkedin.com/in/achmaddaniel",
  "https://www.instagram.com/achmaddaniel__",
  "https://x.com/achmaddaniel24",
];

function normalizePath(path = "") {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export function getSiteUrl() {
  return siteUrl;
}

export function getLocalizedUrl(lang: AppLocale, path = "") {
  return `${siteUrl}/${lang}${normalizePath(path)}`;
}

export function getLanguageAlternates(path = "") {
  return {
    // Broad language targets first: "en"/"id" match any region,
    // so an Indonesian user in Singapore still gets the /id page.
    en: getLocalizedUrl("en", path),
    id: getLocalizedUrl("id", path),
    // x-default MUST resolve with HTTP 200. Pointing it at the bare
    // siteUrl was the bug: "/" 301-redirects to "/en", so Google kept
    // crawling a URL it could never index ("Crawled - currently not
    // indexed" in Search Console). defaultLocale in proxy.ts is "en".
    "x-default": getLocalizedUrl(defaultLocale, path),
  };
}

export function buildSeoMetadata({
  lang,
  path = "",
  title,
  description,
}: {
  lang: AppLocale;
  path?: string;
  title?: string;
  description?: string;
}): Metadata {
  const seo = localizedSeo[lang];
  const canonicalUrl = getLocalizedUrl(lang, path);
  const resolvedTitle = title ?? seo.title;
  const resolvedDescription = description ?? seo.description;

  return {
    metadataBase: new URL(siteUrl),
    title: resolvedTitle,
    description: resolvedDescription,
    applicationName: siteName,
    referrer: "origin-when-cross-origin",
    category: "technology",
    keywords: seo.keywords,
    authors: [{ name: personName, url: siteUrl }],
    creator: personName,
    publisher: personName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/favicon.ico",
    },
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      type: "website",
      locale: seo.locale,
      url: canonicalUrl,
      siteName,
      title: resolvedTitle,
      description: resolvedDescription,
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${resolvedTitle} Open Graph Image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      creator: "@achmaddaniel24",
      images: [defaultOgImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      google:
        process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
        process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

export function getHomeStructuredData(lang: AppLocale) {
  const seo = localizedSeo[lang];
  const pageUrl = getLocalizedUrl(lang);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${siteUrl}#person`,
      name: personName,
      givenName: "Achmad Daniel",
      familyName: "Syahputra",
      alternateName: ["Achmad Daniel", "kudanilll", "Nielcode"],
      url: getLocalizedUrl(lang),
      mainEntityOfPage: { "@id": `${getLocalizedUrl(lang)}#webpage` },
      image: {
        "@type": "ImageObject",
        url: profileImage,
        caption: personName,
      },
      jobTitle: "Software Engineer",
      description: seo.description,
      email: "mailto:hello.achmaddaniel@gmail.com",
      sameAs: socialProfiles,
      // Local signals: this is what lets "web developer Bekasi" style
      // queries connect the entity to a place.
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bekasi",
        addressRegion: "Jawa Barat",
        addressCountry: "ID",
      },
      nationality: { "@type": "Country", name: "Indonesia" },
      knowsLanguage: [
        { "@type": "Language", name: "Indonesian", alternateName: "id" },
        { "@type": "Language", name: "English", alternateName: "en" },
      ],
      knowsAbout: [
        "Web Development",
        "Mobile App Development",
        "Next.js",
        "React",
        "Flutter",
        "Kotlin",
        "TypeScript",
        "Go",
        "PostgreSQL",
        "Docker",
        "Internet of Things",
      ],
      worksFor: {
        "@type": "Organization",
        "@id": "https://nielcode.com#organization",
        name: "Nielcode",
        url: "https://nielcode.com",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://nielcode.com#organization",
      name: "Nielcode",
      url: "https://nielcode.com",
      founder: { "@id": `${siteUrl}#person` },
      areaServed: { "@type": "Country", name: "Indonesia" },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: siteName,
      description: seo.siteDescription,
      inLanguage: lang,
      publisher: {
        "@id": `${siteUrl}#person`,
      },
    },
    {
      "@context": "https://schema.org",
      // ProfilePage is the correct type for a page that IS a person's
      // profile. WebPage is generic and tells Google nothing extra.
      "@type": "ProfilePage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: seo.title,
      description: seo.description,
      inLanguage: lang,
      isPartOf: { "@id": `${siteUrl}#website` },
      about: { "@id": `${siteUrl}#person` },
      mainEntity: { "@id": `${siteUrl}#person` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: defaultOgImage,
      },
      hasPart: { "@id": `${pageUrl}#works` },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${pageUrl}#works`,
      name: lang === "id" ? "Proyek Pilihan" : "Selected Works",
      numberOfItems: works.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: works.map((work, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          "@id": `${pageUrl}#work-${work.title.toLowerCase()}`,
          name: work.title,
          description: work.description[lang],
          url: work.href,
          image: `${siteUrl}${work.image}`,
          genre: work.category,
          inLanguage: lang,
          author: { "@id": `${siteUrl}#person` },
          creator: { "@id": `${siteUrl}#person` },
        },
      })),
    },
  ];
}
