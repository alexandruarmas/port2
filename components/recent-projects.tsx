"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa6";
import { motion, cubicBezier } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

import { projects } from "@/data";
import { getImagePath } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: readonly string[];
  link: string;
  sourceCode: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  totalProjects: number;
}

const ProjectCard = ({ project, index, totalProjects }: ProjectCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { id, des, iconLists, img, link, sourceCode, title } = project;

  // Calculate if the card should come from left or right based on its position in the grid
  const isInLeftColumn = index % 2 === 0;
  const initialX = isInLeftColumn ? -50 : 50;

  // Custom easing curve that starts slow and accelerates
  const customEasing = cubicBezier(0.4, 0.0, 0.9, 0.5);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: initialX
      }}
      animate={{
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : initialX
      }}
      transition={{
        duration: 1.2,
        ease: customEasing,
        opacity: { duration: 0.8 } // Fade in slightly faster than the movement
      }}
      className="card-container h-[28rem] w-full overflow-hidden sm:h-[32rem] md:h-[36rem]"
      style={{ perspective: "1000px" }}
    >
      <div className="card-inner relative h-full w-full transition-transform duration-800 [transform-style:preserve-3d]">
        {/* Front of card */}
        <div className="absolute h-full w-full [backface-visibility:hidden]">
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-[#13162d]">
            <div className="absolute inset-0">
              <Image
                height={330}
                width={552}
                src={getImagePath("/bg.png")}
                alt="bg-img"
                className="h-full w-full object-cover"
              />
            </div>

            {img && (
              <Image
                height={300}
                width={464}
                src={img}
                alt={title}
                className="absolute bottom-0 z-10 max-h-[70%] w-auto"
              />
            )}
          </div>
        </div>

        {/* Back of card - NO BACKGROUND IMAGE */}
        <div className="absolute h-full w-full rounded-xl bg-[#13162d] p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex h-full flex-col justify-between">
            <div>
              <h1 className="mb-4 text-2xl font-bold text-white">{title}</h1>
              <p className="text-base text-gray-300 font-andika">{des}</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {iconLists.map((icon: string) => (
                  <div
                    key={icon}
                    className="flex h-8 w-8 items-center justify-center bg-black/30 rounded-lg"
                  >
                    <Image
                      height={24}
                      width={24}
                      src={icon}
                      alt={icon}
                      className="p-1"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-lg bg-purple px-4 py-2 text-sm font-medium text-white hover:bg-purple/80"
                >
                  Vizitează Site
                </Link>

                <Link
                  href={sourceCode}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center text-sm text-purple hover:text-purple/80"
                >
                  Cod Sursă
                  <FaLocationArrow className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const RecentProjects = () => {
  return (
    <section id="projects" className="w-full overflow-hidden py-16">
      <h1 className="heading-rye mb-16 text-center">
        O selecție de{" "}
        <span className="text-purple">proiecte recente</span>
      </h1>

      <div className="mx-auto grid w-full max-w-[95%] grid-cols-1 gap-8 md:max-w-[90%] md:grid-cols-2 lg:max-w-[1440px]">
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index}
            totalProjects={projects.length}
          />
        ))}
      </div>

      <style jsx global>{`
        .card-container {
          perspective: 1000px;
          -webkit-perspective: 1000px;
          -moz-perspective: 1000px;
        }
        
        .card-inner {
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          -moz-transform-style: preserve-3d;
          transition: transform 0.8s;
          -webkit-transition: -webkit-transform 0.8s;
        }

        .card-container:hover .card-inner {
          transform: rotateY(180deg);
          -webkit-transform: rotateY(180deg);
          -moz-transform: rotateY(180deg);
        }

        .card-inner > div:first-child {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          -moz-backface-visibility: hidden;
        }

        .card-inner > div:last-child {
          transform: rotateY(180deg);
          -webkit-transform: rotateY(180deg);
          -moz-transform: rotateY(180deg);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          -moz-backface-visibility: hidden;
          background: #13162d !important;
          background-image: none !important;
        }
      `}</style>
    </section>
  );
};


