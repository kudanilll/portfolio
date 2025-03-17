/* eslint-disable @typescript-eslint/no-explicit-any */
import GradualSpacing from "@/components/typography/gradual-spacing";

export default function AboutView({ lang }: { lang: any }) {
  return (
    <section id="about">
      <div className="md:mt-20">
        <GradualSpacing
          className="text-4xl font-bold -tracking-widest text-white md:text-7xl md:leading-[5rem]"
          text={lang.about_section.title}
        />
      </div>
    </section>
  );
}
