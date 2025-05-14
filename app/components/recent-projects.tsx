import React from "react";
import ProjectCard from "./project-card";
import { projectsData } from "@/lib/data";

export default function RecentProjects() {
  return (
    <section>
      <div className="flex justify-center items-center w-full p-0 m-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-[1440px] gap-0 p-0 m-0">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              tags={project.tags}
              imageUrl={project.imageUrl}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 