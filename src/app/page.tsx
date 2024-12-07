"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import NavigationBar from "@/components/partials/navbar";
import Section from "@/components/partials/section";
import Footer from "@/components/partials/footer";
import VelocityScroll from "@/components/typography/scroll-based-velocity";
import TechStackMarquee from "@/components/ui/marquee/tech-stack";

export default function Page() {
  return (
    <AuroraBackground>
      <NavigationBar />
      <Section id="home"></Section>
      <Section id="about"></Section>
      <VelocityScroll
        text="Web Developer • Mobile Developer • IoT Enthusiast • "
        default_velocity={5}
        className="text-center text-4xl font-semibold tracking-[-0.02em] drop-shadow-sm text-neutral-400 md:text-7xl md:leading-[5rem]"
      />
      <Section id="projects"></Section>
      <Section id="services"></Section>
      <TechStackMarquee />
      <Section id="contact"></Section>
      <Footer />
    </AuroraBackground>
  );
}
