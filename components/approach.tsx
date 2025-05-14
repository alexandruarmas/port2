"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { MagicButton } from "@/components/ui/magic-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const Approach = () => {
  return (
    <section className="w-full section-spacing">
      <h1 className="heading-rye">
        Abordarea <span className="text-purple">mea</span>
      </h1>

      <div className="element-spacing flex flex-col items-center justify-center gap-3 lg:flex-row">
        <ScrollReveal direction="left">
          <Card
            title="Planificare & Strategie"
            icon={<MagicButton title="Faza 1" asChild />}
            description="Colaborăm pentru a defini obiectivele proiectului, publicul țintă și funcționalitățile cheie. Discutăm structura site-ului, navigarea și cerințele de conținut pentru a asigura alinierea cu nevoile de business."
          >
            <CanvasRevealEffect
              animationSpeed={5.1}
              containerClassName="bg-emerald-900"
            />
          </Card>
        </ScrollReveal>

        <ScrollReveal direction="right">
          <Card
            title="Implementare & Actualizări"
            icon={<MagicButton title="Faza 2" asChild />}
            description="După stabilirea planului, încep implementarea soluției. De la primele schițe la codul final, vei primi actualizări constante privind progresul proiectului."
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-black"
              colors={[
                [236, 72, 153],
                [232, 121, 249],
              ]}
              dotSize={2}
            />
          </Card>
        </ScrollReveal>

        <ScrollReveal direction="left">
          <Card
            title="Dezvoltare & Lansare"
            icon={<MagicButton title="Faza 3" asChild />}
            description="Aici are loc magia! Pe baza designului aprobat, transform totul în cod funcțional, construind site-ul de la zero și asigurând o lansare de succes."
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-sky-600"
              colors={[[125, 211, 252]]}
              dotSize={2}
            />
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};

type CardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
};

const Card = ({ title, description, icon, children }: CardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/canvas-card relative mx-auto flex w-full max-w-sm items-center justify-center rounded-3xl border border-black/[0.2] p-3 dark:border-white/[0.2] lg:h-[28rem]"
    >
      <Icon className="absolute -left-3 -top-3 h-6 w-6 text-black dark:text-white" />
      <Icon className="absolute -bottom-3 -left-3 h-6 w-6 text-black dark:text-white" />
      <Icon className="absolute -right-3 -top-3 h-6 w-6 text-black dark:text-white" />
      <Icon className="absolute -bottom-3 -right-3 h-6 w-6 text-black dark:text-white" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 h-full w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="absolute left-[50%] top-[50%] mx-auto flex w-full -translate-x-[50%] -translate-y-[50%] items-center justify-center text-center transition duration-200 group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0">
          {icon}
        </div>

        <h2 className="relative z-10 mt-4 text-3xl font-bold text-black opacity-0 transition  duration-200 group-hover/canvas-card:-translate-y-2 group-hover/canvas-card:text-white group-hover/canvas-card:opacity-100 dark:text-white">
          {title}
        </h2>

        <p
          className="relative z-10 mt-4 text-sm font-bold text-black opacity-0 transition duration-200 group-hover/canvas-card:-translate-y-2 group-hover/canvas-card:text-white group-hover/canvas-card:opacity-100 dark:text-white font-andika"
          style={{
            color: "#e4ecff",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export const Icon = ({ className, ...props }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
