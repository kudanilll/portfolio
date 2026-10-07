import type { Metadata } from "next";
import { locales, type AppLocale } from "@/common/i18n";
import { expertise } from "@/data/expertise";
import { email, socials } from "@/data/socials";
import { works } from "@/data/works";

const siteUrl = "https://achmaddaniel.nielcode.com";
/** Every language is served at this one URL (see src/proxy.ts). */
const pageUrl = `${siteUrl}/`;
const siteName = "Achmad Daniel Syahputra";
const personName = "Achmad Daniel Syahputra";
const profileImage = `${siteUrl}/assets/images/achmad-daniel.webp`;
const ogImage = "/assets/images/og-image.png";
const ogImageSmall = "/assets/images/og-image-800-600.png";

// Set when the page is built, so it moves with every deploy
const lastModified = new Date().toISOString();

const ids = {
  person: `${siteUrl}/#person`,
  website: `${siteUrl}/#website`,
  webpage: `${siteUrl}/#webpage`,
  works: `${siteUrl}/#works`,
  organization: "https://nielcode.com/#organization",
};

const localizedSeo = {
  en: {
    locale: "en_US",
    // Name first: it is the query this page wins. Keep it under ~60 chars.
    title: "Achmad Daniel Syahputra | Creative Developer, Bekasi",
    description:
      "Achmad Daniel Syahputra is a creative developer in Bekasi, Indonesia, building fast websites, Android apps and backends with Next.js, GSAP, Flutter and Go.",
    siteDescription:
      "Selected web and mobile projects by Achmad Daniel Syahputra, a creative developer in Bekasi, and the stack he builds them with.",
    worksName: "Selected works",
    ogImageAlt:
      "Achmad Daniel Syahputra in white type on black, with a lime asterisk and lime shapes",
    keywords: [
      "Achmad Daniel Syahputra",
      "Achmad Daniel",
      "creative developer",
      "creative developer Indonesia",
      "frontend developer Bekasi",
      "Next.js developer",
      "GSAP developer",
      "Android developer",
      "Flutter developer",
      "software engineer Indonesia",
    ],
  },
  id: {
    locale: "id_ID",
    title: "Achmad Daniel Syahputra | Creative Developer Bekasi",
    description:
      "Achmad Daniel Syahputra, creative developer asal Bekasi yang membangun website cepat, aplikasi Android, dan backend dengan Next.js, GSAP, Flutter, dan Go.",
    siteDescription:
      "Proyek web dan mobile pilihan dari Achmad Daniel Syahputra, creative developer di Bekasi, beserta teknologi yang ia pakai.",
    worksName: "Pekerjaan pilihan",
    ogImageAlt:
      "Tulisan Achmad Daniel Syahputra berwarna putih di atas hitam, dengan tanda bintang dan bentuk berwarna lime",
    keywords: [
      "Achmad Daniel Syahputra",
      "Achmad Daniel",
      "creative developer",
      "jasa pembuatan website",
      "web developer Bekasi",
      "developer Next.js",
      "developer Android",
      "developer Flutter",
      "software engineer Indonesia",
    ],
  },
} satisfies Record<
  AppLocale,
  {
    locale: string;
    title: string;
    description: string;
    siteDescription: string;
    worksName: string;
    ogImageAlt: string;
    keywords: string[];
  }
>;

export const socialProfiles = socials.map((social) => social.href);

export function getSiteUrl() {
  return siteUrl;
}

export function buildSeoMetadata({ lang }: { lang: AppLocale }): Metadata {
  const seo = localizedSeo[lang];
  const otherLocales = locales
    .filter((locale) => locale !== lang)
    .map((locale) => localizedSeo[locale].locale);

  return {
    metadataBase: new URL(siteUrl),
    title: seo.title,
    description: seo.description,
    applicationName: siteName,
    referrer: "origin-when-cross-origin",
    category: "technology",
    keywords: seo.keywords,
    authors: [{ name: personName, url: pageUrl }],
    creator: personName,
    publisher: personName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/assets/images/icon-512.png",
    },
    // One URL for every language, so no hreflang alternates: the canonical
    // is the root, and search engines index the default language there.
    alternates: { canonical: "/" },
    openGraph: {
      type: "profile",
      firstName: "Achmad Daniel",
      lastName: "Syahputra",
      locale: seo.locale,
      alternateLocale: otherLocales,
      url: "/",
      siteName,
      title: seo.title,
      description: seo.description,
      images: [
        { url: ogImage, width: 1200, height: 630, alt: seo.ogImageAlt, type: "image/png" },
        { url: ogImageSmall, width: 800, height: 600, alt: seo.ogImageAlt, type: "image/png" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [{ url: ogImage, alt: seo.ogImageAlt }],
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

/** JSON-LD for the home page, as one @graph so the entities can reference each other. */
export function getHomeStructuredData(lang: AppLocale) {
  const seo = localizedSeo[lang];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": ids.person,
        name: personName,
        givenName: "Achmad Daniel",
        familyName: "Syahputra",
        alternateName: ["Achmad Daniel", "kudanilll"],
        url: pageUrl,
        mainEntityOfPage: { "@id": ids.webpage },
        image: {
          "@type": "ImageObject",
          url: profileImage,
          caption: personName,
        },
        jobTitle: "Creative Developer",
        description: seo.description,
        email: `mailto:${email}`,
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
        // Same list as the expertise section, so the two never drift apart
        knowsAbout: [
          "Creative Development",
          "Frontend Development",
          "Android Development",
          ...expertise,
        ],
        worksFor: { "@id": ids.organization },
      },
      {
        "@type": "Organization",
        "@id": ids.organization,
        name: "Nielcode",
        url: "https://nielcode.com",
        founder: { "@id": ids.person },
        areaServed: { "@type": "Country", name: "Indonesia" },
      },
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: pageUrl,
        name: siteName,
        description: seo.siteDescription,
        inLanguage: [...locales],
        publisher: { "@id": ids.person },
      },
      {
        // ProfilePage is the correct type for a page that IS a person's
        // profile. WebPage is generic and tells Google nothing extra.
        "@type": "ProfilePage",
        "@id": ids.webpage,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: lang,
        dateModified: lastModified,
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.person },
        mainEntity: { "@id": ids.person },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteUrl}${ogImage}`,
          width: 1200,
          height: 630,
        },
        hasPart: { "@id": ids.works },
      },
      {
        "@type": "ItemList",
        "@id": ids.works,
        name: seo.worksName,
        numberOfItems: works.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: works.map((work, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            "@id": `${siteUrl}/#work-${work.title.toLowerCase()}`,
            name: work.title,
            description: work.description[lang],
            url: work.href,
            image: `${siteUrl}${work.image}`,
            genre: work.category,
            inLanguage: lang,
            author: { "@id": ids.person },
            creator: { "@id": ids.person },
          },
        })),
      },
    ],
  };
}

export { lastModified };
