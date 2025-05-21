/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-async-client-component */

import NavigationBar from "@/components/partials/navbar";
import Section from "@/components/partials/section";
import Footer from "@/components/partials/footer";
import CursorPointer from "@/components/ui/cursor-pointer";
import Particles from "@/components/ui/particles";
import TechStackMarquee from "@/components/ui/tech-stack-marquee";
import VelocityScroll from "@/components/typography/scroll-based-velocity";
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
    <div>
      <NavigationBar />
      <Particles />
      <Section id="home" lang={t}></Section>
      <Section id="about" lang={t}></Section>
      <VelocityScroll
        text="Web Developer • Mobile Developer • IoT Enthusiast • "
        defaultVelocity={5}
        className="text-center text-4xl font-semibold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
      />
      <Section id="projects" lang={t}></Section>
      <Section id="services" lang={t}></Section>
      <TechStackMarquee />
      <Section id="contact" lang={t}></Section>
      <Footer />
      <CursorPointer color="#ffffffaa" />
    </div>
  );
}
