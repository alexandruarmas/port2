import { Approach } from "@/components/approach";
import { Clients } from "@/components/clients";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Grid } from "@/components/grid";
import { Hero } from "@/components/hero";
import { FloatingNav } from "@/components/ui/floating-nav";
import { RecentProjects } from "@/components/recent-projects";
import { navItems } from "@/data";

const MainPage = () => {
  return (
    <main className="relative mx-auto flex flex-col items-center justify-center overflow-clip bg-black-100 px-5 pt-[50px] sm:px-10">
      <FloatingNav navItems={navItems} />

      <div className="w-full max-w-7xl flex flex-col gap-4 md:gap-6 lg:gap-8">
        <Hero />
        <Grid />
        <RecentProjects />
        <Clients />
        <Experience />
        <Approach />
        <Contact />
      </div>
    </main>
  );
};

export default MainPage;
