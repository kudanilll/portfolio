/* eslint-disable @typescript-eslint/no-explicit-any */

import GradualSpacing from "@/components/typography/gradual-spacing";

export default function ServicesView({ lang }: { lang: any }) {
  const services = [
    {
      title: "Mobile Development",
      description:
        "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    },
    {
      title: "Web Development",
      description:
        "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    },
    {
      title: "Internet of Things",
      description:
        "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    },
  ];

  return (
    <section id="services" className="py-12 md:py-64">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-12 md:mb-16">
          <GradualSpacing
            className="text-center text-4xl font-bold -tracking-widest text-neutral-200 md:text-7xl md:leading-[4rem]"
            align="center"
            text={lang.service_section.title}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group rounded-xl border border-neutral-700 bg-neutral-800/20 p-6 transition-all hover:bg-neutral-800/50 backdrop-blur"
            >
              <h3 className="mb-4 text-xl font-semibold text-neutral-200 md:text-2xl">
                {service.title}
              </h3>
              <p className="text-neutral-400 transition-all group-hover:text-neutral-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
