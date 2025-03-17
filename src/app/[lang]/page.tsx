/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-async-client-component */

import NavigationBar from "@/components/partials/navbar";
import Section from "@/components/partials/section";
import Footer from "@/components/partials/footer";
import AuroraBackground from "@/components/ui/aurora-background";
import CursorPointer from "@/components/ui/cursor-pointer";
import TechStackMarquee from "@/components/ui/marquee/tech-stack";
import VelocityScroll from "@/components/typography/scroll-based-velocity";
import getDictionary from "./dictionaries";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const t = await getDictionary(lang);
  return {
    title: t.page.title,
    description: t.page.desc,
  };
}

export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const t = await getDictionary(lang);
  return (
    <div className="bg-black">
      <NavigationBar />
      <AuroraBackground />
      <Section id="home" lang={t}></Section>
      <Section id="about" lang={t}></Section>
      <VelocityScroll
        text="Web Developer • Mobile Developer • IoT Enthusiast • "
        default_velocity={5}
        className="text-center text-4xl font-semibold tracking-[-0.02em] drop-shadow-sm text-neutral-400 md:text-7xl md:leading-[5rem]"
      />
      <Section id="projects" lang={t}></Section>
      <Section id="services" lang={t}></Section>
      <TechStackMarquee />
      <Section id="contact" lang={t}></Section>
      <Footer />
      <div className="hidden md:block">
        <CursorPointer color="#ffffffaa" />
      </div>
    </div>
  );
}
