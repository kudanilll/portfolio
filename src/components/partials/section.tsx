"use client";

import HomeView from "@/components/views/home";
import ProjectsView from "@/components/views/projects";
import AboutView from "@/components/views/about";
import ServicesView from "@/components/views/services";
import ContactView from "@/components/views/contact";

type Props = {
  id: "home" | "projects" | "about" | "services" | "contact";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lang: any;
};

const Views = {
  home: HomeView,
  projects: ProjectsView,
  about: AboutView,
  services: ServicesView,
  contact: ContactView,
};

export default function Section(props: Props) {
  const View = Views[props.id];
  return (
    <section className="flex min-h-screen min-w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <View lang={props.lang} />
      </div>
    </section>
  );
}
