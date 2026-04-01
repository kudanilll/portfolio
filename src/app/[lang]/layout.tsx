import type { Metadata } from "next";
import { satoshi } from "@/common/font";
import { Analytics } from "@vercel/analytics/next";
import { buildSeoMetadata, type AppLocale } from "@/common/seo-metadata";
import "@/app/globals.css";

interface LangParams {
  lang: AppLocale;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "id" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LangParams>;
}): Promise<Metadata> {
  const { lang } = await params;

  return buildSeoMetadata({ lang });
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
