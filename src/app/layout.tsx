import type { Metadata } from "next";
import { Inter, Instrument_Sans } from "next/font/google";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
