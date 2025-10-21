/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-async-client-component */

import Footer from "@/components/partials/footer";
import NavigationBar from "@/components/partials/navbar";
import PageClientLayout from "@/components/partials/page-client-layout";
import Section from "@/components/partials/section";
import CursorPointer from "@/components/ui/cursor-pointer";
import VelocityScroll from "@/components/typography/scroll-based-velocity";
import Marquee from "react-fast-marquee";

// Language Dictionary
import getDictionary from "./dictionaries";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const { lang } = params;
  const t = await getDictionary(lang);
  return {
    title: t.page.title,
    description: t.page.desc,
  };
}

export default async function Page(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const { lang } = params;
  const t = await getDictionary(lang);
  return (
    <>
      <div className="hidden md:block">
        <NavigationBar />

        <PageClientLayout>
          <div
            className="absolute top-0 left-0 w-screen h-[85vh] bg-cover bg-center z-0 opacity-30"
            style={{ backgroundImage: "url('/assets/images/background.webp')" }}
          ></div>

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
          <Section id="services" lang={t}></Section>

          <Marquee>
            <h1 className="text-4xl font-bold tracking-tighter md:text-8xl overflow-hidden">
              Web Developer{" "}
              <span className="text-lime-400 overflow-hidden">✦</span> Mobile
              Developer <span className="text-lime-400 overflow-hidden">✦</span>{" "}
              IoT Enthusiast{" "}
              <span className="text-lime-400 overflow-hidden">✦</span>
            </h1>
          </Marquee>

          <div className="relative">
            {/* Background for contact & footer section */}
            <div
              className="absolute bottom-0 left-0 w-screen h-screen bg-cover bg-center z-0 opacity-30"
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
      <div className="md:hidden">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-xl text-center">Nothing to see here :D</h1>
        </div>
      </div>
    </>
  );
}
