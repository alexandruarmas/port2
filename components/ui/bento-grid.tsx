"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";

import { techStack } from "@/data";
import { cn, getImagePath } from "@/lib/utils";

import { BackgroundGradientAnimation } from "./background-gradient-animation";
import { MagicButton } from "./magic-button";

import { GridGlobe } from "../grid-globe";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-5 md:gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  id,
  className,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  id?: number;
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+40726018217";
    const message = "Buna ziua,am nevoie de";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      className={cn(
        "group/bento relative row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-3xl border border-white/[0.1] shadow-input transition duration-200 hover:shadow-xl dark:shadow-none",
        className
      )}
    >
      <BackgroundGradientAnimation
        gradientBackgroundStart={id === 4 ? "rgb(2, 6, 23)" : "rgb(4, 7, 29)"}
        gradientBackgroundEnd={id === 4 ? "rgb(8, 10, 40)" : "rgb(12, 14, 35)"}
        firstColor={id === 4 ? "124, 58, 237" : "76, 29, 149"}
        secondColor={id === 4 ? "99, 102, 241" : "46, 16, 101"}
        thirdColor={id === 4 ? "139, 92, 246" : "93, 58, 201"}
        interactive={id === 4}
        containerClassName="opacity-70"
        className="!absolute inset-0 h-full w-full transition-opacity duration-500 group-hover/bento:opacity-100"
      />
      <div className={cn("h-full", id === 6 && "flex justify-center")}>
        <div className="absolute inset-0 h-full w-full">
          {img && (
            <Image
              width={689}
              height={541}
              src={getImagePath(img)}
              alt={img}
              className={cn("h-full w-full object-cover object-center", imgClassName)}
              priority
            />
          )}
        </div>

        <div
          className={cn(
            "absolute right-0 bottom-0 -mb-5",
            id === 5 && "w-full opacity-80"
          )}
        >
          {spareImg && (
            <Image
              width={208}
              height={96}
              src={getImagePath(spareImg)}
              alt={spareImg}
              className="h-full w-full object-cover object-center"
            />
          )}
        </div>

        {id === 6 && <BackgroundGradientAnimation />}

        <div
          className={cn(
            "relative flex min-h-40 flex-col p-5 px-5 transition duration-200 group-hover/bento:translate-x-2 md:h-full lg:p-10",
            titleClassName
          )}
        >
          {description && (
            <p className="max-w-full text-sm text-white/60 font-andika">
              {description}
            </p>
          )}

          <div className="z-10 max-w-96 font-sans text-lg font-bold lg:text-3xl transition-all duration-300 group-hover/bento:text-white group-hover/bento:translate-x-1">
            {title}
          </div>

          {id === 2 && <GridGlobe />}

          {id === 3 && (
            <div className="absolute -right-3 flex w-fit gap-1 lg:-right-2 lg:gap-5">
              <div className="flex flex-col gap-3 lg:gap-8">
                {techStack.stack1.map((item: string) => (
                  <span
                    key={item}
                    className="rounded-lg bg-[#10132e] px-3 py-2 text-center text-xs opacity-50 lg:px-3 lg:py-4 lg:text-base lg:opacity-100"
                  >
                    {item}
                  </span>
                ))}

                <span className="rounded-lg bg-[#10132e] px-3 py-4 text-center" />
              </div>

              <div className="flex flex-col gap-3 lg:gap-8">
                <span className="rounded-lg bg-[#10132e] px-3 py-4 text-center" />
                {techStack.stack2.map((item: string) => (
                  <span
                    key={item}
                    className="rounded-lg bg-[#10132e] px-3 py-2 text-center text-xs opacity-50 lg:px-3 lg:py-4 lg:text-base lg:opacity-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="group relative mt-5">
              <MagicButton
                title="Contactează-mă pe WhatsApp"
                icon={<FaWhatsapp className="text-xl" />}
                otherClasses="!bg-[#161a31]"
                handleClick={handleWhatsAppClick}
                asChild
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
