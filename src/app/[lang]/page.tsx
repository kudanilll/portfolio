import type { Metadata } from "next";
import {
  buildSeoMetadata,
  getHomeStructuredData,
  type AppLocale,
} from "@/common/seo-metadata";
import Footer from "@/components/partials/footer";
import NavigationBar from "@/components/partials/navbar";
import PageClientLayout from "@/components/partials/page-client-layout";
import Section from "@/components/partials/section";
import CursorPointer from "@/components/ui/cursor-pointer";
import MobileCurtain from "@/components/ui/mobile-curtain";
import VelocityScroll from "@/components/ui/scroll-based-velocity";
import Marquee from "react-fast-marquee";
import Dot from "@/components/svg/dot";

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
  const structuredData = getHomeStructuredData(lang);

  return (
    <div>
      {structuredData.map((schema, index) => (
        <script
          key={`${lang}-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div
        id="hero-transition"
        className="fixed inset-0 z-[1000] pointer-events-none"
      >
        <div
          id="curtain-top"
          className="absolute top-0 left-0 w-full h-1/2 bg-white"
        />
        <div
          id="curtain-bottom"
          className="absolute bottom-0 left-0 w-full h-1/2 bg-white"
        />
        <MobileCurtain />
      </div>

      <NavigationBar />
      <PageClientLayout>
        <div
          id="hero-background"
          className="absolute top-0 left-0 w-screen h-[88svh] md:h-[85vh] bg-cover bg-[position:50%_20%] md:bg-center z-0 opacity-45 md:opacity-30"
          style={{ backgroundImage: "url('/assets/images/background.webp')" }}
        />

        <Section id="hero" lang={t}></Section>
        <Section id="about" lang={t}></Section>

        <div className="py-24">
          <VelocityScroll
            text="Web Developer ✦ Mobile Developer ✦ IoT Enthusiast ✦ "
            defaultVelocity={3}
            className="text-center text-4xl font-bold tracking-tighter drop-shadow-sm md:text-8xl md:leading-[6rem] uppercase"
          />
        </div>

        <Section id="projects" lang={t}></Section>
        <div className="md:translate-y-0 translate-y-[6svh] transform-gpu will-change-transform z-10">
          <div className="md:hidden opacity-25">
            <Dot />
          </div>
          <Section id="services" lang={t}></Section>
        </div>

        <div className="md:translate-y-0 translate-y-[5svh] transform-gpu will-change-transform z-10">
          <Marquee>
            <h1 className="font-bold tracking-tighter text-6xl md:text-8xl overflow-hidden">
              Web Developer <span className="text-lime-400">✦</span> Mobile
              Developer <span className="text-lime-400">✦</span> IoT Enthusiast{" "}
              <span className="text-lime-400">✦</span>
            </h1>
          </Marquee>
          <div className="md:hidden mt-2">
            <Marquee direction="right">
              <h1 className="font-bold tracking-tighter text-6xl md:text-8xl overflow-hidden">
                Web Developer <span className="text-lime-400">✦</span> Mobile
                Developer <span className="text-lime-400">✦</span> IoT
                Enthusiast <span className="text-lime-400">✦</span>
              </h1>
            </Marquee>
          </div>
        </div>

        <div className="relative">
          {/* Background for contact & footer section */}
          <div
            className="absolute bottom-0 left-0 w-screen h-[96svh] md:h-screen bg-cover bg-center z-0 opacity-45 md:opacity-30"
            style={{
              backgroundImage: "url('/assets/images/background.webp')",
            }}
          ></div>
          <Section id="contact" lang={t}></Section>
          <Footer />
        </div>
      </PageClientLayout>

      <CursorPointer color="#ffffffaa" style="stroke" dotSize={48} />
    </div>
  );
}
