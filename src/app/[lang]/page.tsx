import type { Metadata } from "next";
import type { AppLocale } from "@/common/i18n";
import { buildSeoMetadata, getHomeStructuredData } from "@/common/seo-metadata";
// import Marquee from "react-fast-marquee";
// import Footer from "@/components/partials/footer";
import PageClientLayout from "@/components/partials/page-client-layout";
import Section from "@/components/partials/section";
import CursorPointer from "@/components/ui/cursor-pointer";
import IntroAnimation from "@/components/ui/intro-animation";

// Language Dictionary
import getDictionary from "./dictionaries";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as AppLocale;

  return buildSeoMetadata({ lang });
}

export default async function Page(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as AppLocale;
  const t = await getDictionary(lang);
  // "<" is escaped so no string in the data can close the <script> early
  const structuredData = JSON.stringify(getHomeStructuredData(lang)).replace(
    /</g,
    "\\u003c",
  );

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      <IntroAnimation key={lang} />

      <PageClientLayout>
        <Section id="hero" lang={t}></Section>
        <Section id="about" lang={t}></Section>
        <Section id="services" lang={t}></Section>
        <Section id="works" lang={t}></Section>
        <Section id="expertise" lang={t}></Section>
        <Section id="quote" lang={t}></Section>

        {/* <div className="md:translate-y-0 translate-y-[5svh] transform-gpu will-change-transform z-10">
          <Marquee>
            <h1 className="font-bold text-6xl md:text-8xl overflow-hidden">
              Web Developer <span className="text-lime-400">✦</span> Mobile
              Developer <span className="text-lime-400">✦</span> Creative
              Developer <span className="text-lime-400">✦</span>
            </h1>
          </Marquee>
          <div className="md:hidden mt-2">
            <Marquee direction="right">
              <h1 className="font-bold text-6xl md:text-8xl overflow-hidden">
                Web Developer <span className="text-lime-400">✦</span> Mobile
                Developer <span className="text-lime-400">✦</span> Creative
                Developer <span className="text-lime-400">✦</span>
              </h1>
            </Marquee>
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute bottom-0 left-0 w-screen h-[96svh] md:h-screen bg-cover bg-center z-0 opacity-45 md:opacity-30"
            style={{
              backgroundImage: "url('/assets/images/background.webp')",
            }}
          ></div>
          <Section id="contact" lang={t}></Section>
          <Footer />
        </div> */}
      </PageClientLayout>

      <CursorPointer color="#ffffffaa" style="stroke" dotSize={48} />
    </div>
  );
}
