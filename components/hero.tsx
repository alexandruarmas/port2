import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa6";

import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { MagicButton } from "@/components/ui/magic-button";
import { links } from "@/config";

export const Hero = () => {
  return (
    <div className="pb-10 pt-16 md:pt-20 lg:pt-24">
      <div>
        <Spotlight
          className="-left-10 -top-40 h-screen md:-left-32 md:-top-20"
          fill="white"
        />
        <Spotlight
          className="left-full top-10 h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div className="absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-white bg-grid-black/[0.2] dark:bg-black-100 dark:bg-grid-white/[0.03]">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black-100" />
      </div>

      <div className="relative z-10 element-spacing flex justify-center">
        <div className="flex max-w-[89vw] flex-col items-center justify-center md:max-w-2xl lg:max-w-[60vw]">
          <TextGenerateEffect
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words="Transform Idei în Experiențe de Utilizator Excepționale"
          />

          <p className="mb-4 text-center text-sm font-andika md:text-lg md:tracking-wider lg:text-2xl">
            Bună ziua, sunt {links.ownerName}, dezvoltator full-stack dedicat transformării ideilor în soluții digitale bine structurate și eficiente.
          </p>

          <p className="mb-4 text-center text-sm font-andika md:text-lg md:tracking-wider lg:text-xl">
            Mă implic cu plăcere în rezolvarea provocărilor tehnice și în dezvoltarea de aplicații care oferă o experiență fluidă, intuitivă și plăcută pentru utilizatori. Dispun de o pregătire solidă atât în zona de frontend, cât și în cea de backend, ceea ce îmi permite să construiesc produse complete – funcționale, stabile și atent proiectate.
          </p>

          <p className="mb-8 text-center text-sm font-andika md:text-lg md:tracking-wider lg:text-xl">
            Pentru mine, dezvoltarea software înseamnă mai mult decât cod – înseamnă soluții care aduc valoare reală și contribuie la simplificarea și îmbunătățirea vieții de zi cu zi.
          </p>

          <Link href="#projects" className="md:mt-10">
            <MagicButton
              title="Vezi proiectele mele"
              icon={<FaLocationArrow />}
              position="right"
              asChild
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
