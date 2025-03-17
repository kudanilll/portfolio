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
  description: "",
  icons: { icon: "/en/favicon.ico" },
};

interface LangParams {
  lang: "en" | "id";
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "id" }];
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: LangParams;
  }>
) {
  const params = await props.params;

  const { children } = props;

  return (
    <html
      lang={params.lang}
      className="scroll-smooth no-scrollbar"
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
