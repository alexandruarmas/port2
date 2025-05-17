"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa6";
import { motion, cubicBezier } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

import { projects } from "@/data";
import { getImagePath } from "@/lib/utils";

// We'll use CSS import for Google Font instead
// This will be added to the style tag at the bottom

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
      <div className="relative h-full w-full duration-1000 preserve-3d card-inner">
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-[#13162d]">
            <div className="absolute inset-0">
              <Image
                height={330}
                width={552}
                src={getImagePath("/bg.png")}
                alt="bg-img"
                className="h-full w-full object-cover front-image"
                priority
                unoptimized
              />
            </div>

            {img && (
              <Image
                height={300}
                width={464}
                src={img}
                alt={title}
                className="absolute bottom-0 z-10 max-h-[70%] w-auto project-image"
                priority
                unoptimized
              />
            )}
            
            {/* Title added back with custom class for styling */}
            <h2 className="front-card-title absolute top-6 left-6 z-20 text-xl md:text-2xl font-bold text-white drop-shadow-md">
              {title}
            </h2>
          </div>
        </div>

        {/* Back of card - NO IMAGES HERE */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="flex h-full w-full flex-col justify-between rounded-xl bg-[#13162d] p-6 pointer-events-auto">
            <div className="flex-1">
              <p className="text-base text-gray-300 font-andika">{des}</p>
            </div>

            <div className="space-y-4 pointer-events-auto">
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
                      className="p-1 tech-icon"
                      unoptimized
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between z-50 relative">
                <Link
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center w-auto rounded-lg bg-purple px-4 py-2 text-sm font-medium text-white hover:bg-purple/80 cursor-pointer transition-colors duration-200 active:bg-purple/70"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="whitespace-nowrap">Vizitează Site</span>
                </Link>

                <Link
                  href={sourceCode}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center text-sm text-purple hover:text-purple/80 cursor-pointer transition-colors duration-200 active:text-purple/70 px-2 py-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="whitespace-nowrap">Cod Sursă</span>
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
        /* Import Poetsen One font from Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap');
        
        /* Apply the font to front card titles */
        .card-container .front-card-title {
          font-family: 'Poetsen One', cursive;
          letter-spacing: 0.5px;
          transition: opacity 0.2s;
        }
        
        /* Completely hide front title when card is flipped */
        .card-container:hover .front-card-title {
          opacity: 0 !important;
          visibility: hidden !important;
          display: none !important;
          pointer-events: none !important;
        }
        
        /* Simpler rules for hiding only specific images */
        .card-container .front-image,
        .card-container .project-image {
          transition: opacity 0.3s;
        }
        
        .card-container:hover .front-image,
        .card-container:hover .project-image {
          opacity: 0 !important;
          visibility: hidden !important;
        }
        
        /* Explicitly keep tech icons visible */
        .card-container .tech-icon,
        .card-container:hover .tech-icon {
          opacity: 1 !important;
          visibility: visible !important;
          display: inline-block !important;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        /* Add enhanced backface visibility hiding for better browser support */
        .card-container:hover .backface-hidden:first-child {
          visibility: hidden !important;
          opacity: 0 !important;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .card-inner {
          transition: transform 0.6s;
        }
        
        .card-container:hover .card-inner {
          transform: rotateY(180deg);
        }

        /* Ensure back content is clickable when flipped */
        .card-container .card-inner > div:last-child {
          pointer-events: none;
        }
        
        .card-container:hover .card-inner > div:last-child {
          pointer-events: auto;
        }

        /* Prevent front content interaction when flipped */
        .card-container:hover .card-inner > div:first-child {
          pointer-events: none;
        }
      `}</style>
    </section>
  );
};


