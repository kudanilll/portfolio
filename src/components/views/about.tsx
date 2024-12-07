import GradualSpacing from "@/components/typography/gradual-spacing";

export default function AboutView() {
  return (
    <section id="about">
      <div className="md:mt-20">
        <GradualSpacing
          className="text-4xl font-bold -tracking-widest text-white md:text-7xl md:leading-[5rem]"
          text="My Journey"
        />
      </div>
    </section>
  );
}
