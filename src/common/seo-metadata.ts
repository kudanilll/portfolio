import type { Metadata } from "next";

export const SeoMetadata: Metadata = {
  title: {
    default: "Achmad Daniel | Fullstack & Mobile Developer",
    template: "%s | Achmad Daniel",
  },
  description:
    "Portfolio of Achmad Daniel, a Fullstack and Mobile Developer focused on web, mobile apps, and scalable digital solutions. Experienced in modern web technologies, clean architecture, and performance-oriented development.",
  icons: { icon: "/favicon.ico" },

  openGraph: {
    title: "Achmad Daniel | Fullstack & Mobile Developer",
    description:
      "Explore the portfolio of Achmad Daniel, a developer specializing in web and mobile applications with a focus on performance, usability, and clean architecture.",
    url: "https://www.kudaniel.my.id",
    siteName: "Achmad Daniel Portfolio",
    images: [
      {
        url: "https://www.kudaniel.my.id/assets/images/og.webp",
        width: 1200,
        height: 630,
        alt: "Achmad Daniel – Fullstack & Mobile Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Achmad Daniel | Fullstack & Mobile Developer",
    description:
      "Portfolio showcasing web and mobile projects by Achmad Daniel, focused on performance, scalability, and real-world solutions.",
    images: ["https://www.kudaniel.my.id/assets/images/og.webp"],
    creator: "@achmaddaniel24",
  },

  alternates: {
    canonical: "https://www.kudaniel.my.id",
    languages: {
      "en-US": "https://www.kudaniel.my.id/en",
      "id-ID": "https://www.kudaniel.my.id/id",
    },
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

  keywords: [
    "achmad daniel",
    "achmad daniel syahputra",
    "fullstack developer",
    "mobile developer",
    "web developer indonesia",
    "flutter developer",
    "next.js developer",
    "software engineer portfolio",
    "custom software development",
    "saas developer",
  ],

  creator: "Achmad Daniel Syahputra",
  authors: [
    {
      name: "Achmad Daniel Syahputra",
      url: "https://www.kudaniel.my.id",
    },
  ],
};

export default SeoMetadata;
