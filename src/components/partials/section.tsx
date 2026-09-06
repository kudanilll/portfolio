"use client";

import HeroView from "@/components/views/hero";
import ProjectsView from "@/components/views/projects";
import AboutView from "@/components/views/about";
import ServicesView from "@/components/views/services";
import ContactView from "@/components/views/contact";

type Props = {
  id: "hero" | "projects" | "about" | "services" | "contact";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lang: any;
};

const Views = {
  hero: HeroView,
  about: AboutView,
  projects: ProjectsView,
  services: ServicesView,
  contact: ContactView,
};

export default function Section(props: Props) {
  const View = Views[props.id];
  return (
    <section
      className={`flex w-screen ${props.id === "hero" ? "" : "min-h-screen relative z-10 bg-[#0a0a0a]"}`}
    >
      <View lang={props.lang} />
    </section>
  );
}
