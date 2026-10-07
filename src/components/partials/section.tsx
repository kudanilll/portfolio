"use client";

import HeroView from "@/components/views/hero";
import WorksView from "@/components/views/works";
import AboutView from "@/components/views/about";
import ServicesView from "@/components/views/services";
import ExpertiseView from "@/components/views/expertise";
import QuoteView from "@/components/views/quote";

type Props = {
  id: "hero" | "works" | "about" | "services" | "expertise" | "quote";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lang: any;
};

const Views = {
  hero: HeroView,
  about: AboutView,
  works: WorksView,
  services: ServicesView,
  expertise: ExpertiseView,
  quote: QuoteView,
};

// Sections that pin their content need a block parent: GSAP turns pin
// spacing off by default when the pinned element sits in a flex container.
const blockSections: Props["id"][] = ["works", "expertise", "quote"];

export default function Section(props: Props) {
  const View = Views[props.id];
  return (
    <section
      className={`${blockSections.includes(props.id) ? "block" : "flex"} w-screen ${props.id === "hero" ? "" : "min-h-screen relative z-10 bg-[#0a0a0a]"}`}
    >
      <View lang={props.lang} />
    </section>
  );
}
