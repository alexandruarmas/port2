import { getImagePath } from "./utils";

export const projectsData = [
  {
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js and TailwindCSS",
    tags: ["Next.js", "React", "TailwindCSS", "TypeScript"],
    imageUrl: getImagePath("/mrarmas-avatar.png"),
    link: "https://github.com/alexandruarmas/port2",
  },
  {
    title: "WhatsApp Integration",
    description: "Direct messaging integration with WhatsApp API",
    tags: ["API", "React", "Next.js", "Integration"],
    imageUrl: getImagePath("/app.svg"),
    link: "#",
  },
  {
    title: "Interactive Tech Card",
    description: "Dynamic technology showcase with animations",
    tags: ["Framer Motion", "React", "Animation", "UI/UX"],
    imageUrl: getImagePath("/ts.svg"),
    link: "#",
  },
]; 