import type { Metadata } from "next";
import { satoshi } from "@/common/font";
import { Analytics } from "@vercel/analytics/next";
import SeoMetadata from "@/common/seo-metadata";
import "@/app/globals.css";

// Metadata
export const metadata: Metadata = SeoMetadata;

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
      <body className={`${satoshi.className} antialiased select-none`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
