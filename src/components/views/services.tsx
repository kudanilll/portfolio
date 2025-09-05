/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { ResponsiveComponents } from "@/lib/responsive";
import { useState } from "react";
import Image from "next/image";
import Abstract from "@/components/svg/abstract";

export default function ServicesView({ lang }: { lang: any }) {
  const [currentService, setCurrentService] = useState<number>(0);

  const services = [
    {
      title: "Mobile Development",
      image: "/assets/images/og.png",

      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Web Development",
      image: "/assets/images/og.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Internet of Things",
      image: "/assets/images/og.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <section
      id="services"
      className="flex flex-col items-center justify-center mt-36 mb-12"
    >
      <div className="hidden md:block w-screen">
        <ResponsiveComponents
          desktopComponents={
            <h1 className="mb-12 px-4 md:px-8 text-5xl text-white tracking-tighter uppercase">
              {lang.service_section.title}
            </h1>
          }
          mobileComponents={<></>}
        />

        <div className="min-h-screen relative bg-neutral-950">
          {/* List Services */}
          <div className="absolute top-8 right-8">
            {services.map((service, index) => (
              <div key={index} className="pb-1">
                <h1
                  onClick={() => setCurrentService(index)}
                  className={`${
                    currentService === index
                      ? "text-lime-400"
                      : "text-white/30 hover:text-white/70 transition-all duration-300"
                  } text-end md:text-6xl font-semibold tracking-tighter cursor-pointer flex items-center justify-end gap-4`}
                >
                  {service.title} {currentService === index ? <Abstract /> : ""}
                </h1>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="absolute top-8 left-8">
            <Image
              src={services[currentService].image}
              alt={services[currentService].title}
              width={600}
              height={600}
            />
          </div>

          {/* Description */}
          <div className="absolute bottom-36 left-8 right-8">
            <h1 className="text-white text-start md:text-4xl max-w-4xl tracking-tighter">
              {services[currentService].description}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
