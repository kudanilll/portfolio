import type { Metadata } from "next";
import { Inter, Instrument_Sans } from "next/font/google";
import "@/app/globals.css";

// Font
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

// Metadata
export const metadata: Metadata = {
  title: "Portfolio | Achmad Daniel",
  description: "Achmad Daniel Syahputra Web Portfolio",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Portfolio | Achmad Daniel",
    description: "Achmad Daniel Syahputra Web Portfolio",
    url: "https://www.kudaniel.my.id",
    siteName: "kudaniel",
    images: [
      {
        url: "https://www.kudaniel.my.id/assets/images/og.png",
        alt: "Portfolio | Achmad Daniel",
        width: 800,
        height: 600,
      },
      {
        url: "https://www.kudaniel.my.id/assets/images/og.png",
        alt: "Portfolio | Achmad Daniel",
        width: 1800,
        height: 1600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creatorId: "@achmaddaniel24",
    title: "Portfolio | Achmad Daniel",
    description: "Achmad Daniel Syahputra Web Portfolio",
    images: {
      url: "https://www.kudaniel.my.id/assets/images/og.png",
      alt: "Portfolio | Achmad Daniel",
    },
    creator: "Achmad Daniel Syahputra",
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
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    "kudaniel",
    "kudanil",
    "achmad daniel",
    "achmad daniel syahputra",
    "achmaddaniel24",
    "achmaddaniel",
    "developer",
    "web developer",
    "web dev",
    "mobile developer",
    "mobile dev",
    "iot enthusiast",
    "fullstack developer",
    "portfolio",
    "web portfolio",
  ],
  publisher: "Vercel",
  creator: "Achmad Daniel Syahputra",
  authors: [
    { name: "Achmad Daniel Syahputra", url: "https://www.kudaniel.my.id" },
  ],
};

interface LangParams {
  lang: "en" | "id";
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "id" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<LangParams>;
}>) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      className="scroll-smooth no-scrollbar bg-black text-white"
      style={{ scrollBehavior: "smooth" }}
    >
      <body
        className={`${inter.variable} ${instrumentSans.variable} antialiased select-none`}
      >
        {children}
      </body>
    </html>
  );
}
