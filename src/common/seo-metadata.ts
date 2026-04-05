import type { Metadata } from "next";

export const locales = ["en", "id"] as const;

export type AppLocale = (typeof locales)[number];

const siteUrl = "https://kudaniel.my.id";
const siteName = "Achmad Daniel Portfolio";
const personName = "Achmad Daniel Syahputra";
const defaultOgImage = `${siteUrl}/assets/images/og.webp`;
const profileImage = `${siteUrl}/assets/images/achmad-daniel.webp`;

const localizedSeo = {
  en: {
    locale: "en_US",
    title: "Achmad Daniel | Programmer",
    description:
      "Portfolio of Achmad Daniel, a Programmer building high-performance websites, mobile apps, and scalable digital products.",
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
    title: "Achmad Daniel | Programmer",
    description:
      "Portfolio Achmad Daniel, seorang Programmer yang membangun website cepat, aplikasi mobile, dan produk digital yang scalable.",
    siteDescription:
      "Jelajahi proyek pilihan, layanan, dan keahlian teknis di bidang web development, mobile engineering, dan solusi berbasis IoT.",
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
    "en-US": getLocalizedUrl("en", path),
    "id-ID": getLocalizedUrl("id", path),
    "x-default": siteUrl,
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
    manifest: "/manifest.webmanifest",
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
      url: siteUrl,
      image: profileImage,
      jobTitle: "Programmer",
      description: seo.description,
      email: "mailto:hello.achmaddaniel@gmail.com",
      sameAs: socialProfiles,
      knowsAbout: [
        "Web Development",
        "Mobile App Development",
        "Next.js",
        "Flutter",
        "TypeScript",
        "Go",
        "IoT",
      ],
      worksFor: {
        "@type": "Organization",
        name: personName,
      },
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
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: seo.title,
      description: seo.description,
      inLanguage: lang,
      isPartOf: {
        "@id": `${siteUrl}#website`,
      },
      about: {
        "@id": `${siteUrl}#person`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: defaultOgImage,
      },
    },
  ];
}
