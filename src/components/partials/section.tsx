"use client";

import HeroView from "@/components/views/hero";
import WorksView from "@/components/views/works";
import AboutView from "@/components/views/about";
import ServicesView from "@/components/views/services";
import ExpertiseView from "@/components/views/expertise";
import ContactView from "@/components/views/contact";

type Props = {
  id: "hero" | "works" | "about" | "services" | "expertise" | "contact";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lang: any;
};

const Views = {
  hero: HeroView,
  about: AboutView,
  works: WorksView,
  services: ServicesView,
  expertise: ExpertiseView,
  contact: ContactView,
};

export default function Section(props: Props) {
  const View = Views[props.id];
  return (
    <section
      className={`${props.id === "works" || props.id === "expertise" ? "block" : "flex"} w-screen ${props.id === "hero" ? "" : "min-h-screen relative z-10 bg-[#0a0a0a]"}`}
    >
      <View lang={props.lang} />
    </section>
  );
}
