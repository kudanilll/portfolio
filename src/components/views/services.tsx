/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import GradualSpacing from "@/components/typography/gradual-spacing";
import StickyScroll from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";

const services = [
  {
    title: "Mobile Development",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <Image
        src="/en/assets/illustration/mobile.jpg"
        alt="Mobile Service Illustration"
        width={600}
        height={600}
        className="h-full w-full object-cover"
      />
    ),
  },
  {
    title: "Web Development",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <Image
        src="/en/assets/illustration/web.jpg"
        alt="Web Service Illustration"
        width={600}
        height={600}
        className="h-full w-full object-cover"
      />
    ),
  },
  {
    title: "Internet of Things",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <Image
        src="/en/assets/illustration/iot.jpg"
        alt="IoT Service Illustration"
        width={600}
        height={600}
        className="h-full w-full object-cover"
      />
    ),
  },
];

export default function ServicesView({ lang }: { lang: any }) {
  return (
    <section id="services">
      <div className="min-h-screen flex flex-row items-center justify-center">
        <GradualSpacing
          className="text-4xl font-bold -tracking-widest text-white md:text-7xl md:leading-[4rem]"
          text={"What can I do\nfor you?"}
        />
        <div className="pl-10">
          <StickyScroll content={services} />
        </div>
      </div>
    </section>
  );
}
