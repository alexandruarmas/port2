import Image from "next/image";

import { Button } from "@/components/ui/moving-borders";
import { workExperience } from "@/data";
import { getImagePath } from "@/lib/utils";

export const Experience = () => {
  return (
    <section id="experience" className="section-spacing">
      <h1 className="heading-rye mb-8">
        Experiența mea <span className="text-purple">profesională</span>
      </h1>

      <div className="element-spacing grid w-full grid-cols-1 gap-6 px-4 md:px-6 lg:grid-cols-2 xl:grid-cols-4">
        {workExperience.map((experience) => (
          <Button
            key={experience.id}
            borderRadius="1.75rem"
            className="flex-1 border-neutral-200 text-white dark:border-slate-800"
            duration={Math.floor(Math.random() * 10000 + 10000)}
          >
            <div className="flex flex-col gap-2 p-3 py-4 lg:flex-row lg:items-center lg:p-6">
              <Image
                width={95}
                height={87}
                src={getImagePath(experience.thumbnail)}
                alt={experience.title}
                className="h-auto w-16 md:w-20 lg:w-24"
              />

              <div className="lg:ms-3">
                <h1 className="text-start text-lg font-bold md:text-xl lg:text-2xl">
                  {experience.title}
                </h1>
                <p className="mt-2 text-start text-sm font-semibold text-white-100 font-andika md:text-base">
                  {experience.desc}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </section>
  );
};
