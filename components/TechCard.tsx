import { iconMap } from "@/data/iconMap";

export const TechCard = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;

  const categories = {
    FRONTEND: ['React.js', 'Next.js', 'Vue.js', 'Typescript', 'TailwindCSS'],
    BACKEND: ['Node.js', 'Express.js', 'Prisma', 'NestJS', 'GraphQL'],
    DEVOPS: ['Docker', 'AWS', 'Vercel', 'GitHub Actions', 'Kubernetes'],
    DATABASE: ['MongoDB', 'PostgreSQL', 'Firebase', 'Redis', 'MySQL']
  };

  // Custom hover effects based on technology
  const getHoverEffect = (tech: string, category: string) => {
    // Frontend effects - effects that represent UI rendering and reactivity
    if (category === 'FRONTEND') {
      if (tech === 'React.js') return 'group-hover:scale-125 group-hover:rotate-45 group-hover:text-cyan-400 group-hover:transition-all duration-500'; // React's circular motion
      if (tech === 'Next.js') return 'group-hover:scale-125 group-hover:text-gray-200 group-hover:rotate-[360deg] group-hover:transition-all duration-700'; // Next's fast speed and navigation
      if (tech === 'Vue.js') return 'group-hover:scale-110 group-hover:rotate-12 group-hover:text-green-400 group-hover:skew-x-6'; // Vue's progressive framework tilt
      if (tech === 'Typescript') return 'group-hover:scale-125 group-hover:text-blue-500 group-hover:-translate-y-2'; // TypeScript's type safety lift
      return 'group-hover:scale-110 group-hover:text-pink-400 group-hover:rotate-3 group-hover:shadow-pink-200'; // TailwindCSS styling glow
    }
    
    // Backend effects - data flow and processing movements
    if (category === 'BACKEND') {
      if (tech === 'Node.js') return 'group-hover:scale-125 group-hover:text-green-500 group-hover:skew-y-3 group-hover:rotate-6'; // Node's event loop twisting
      if (tech === 'Express.js') return 'group-hover:scale-110 group-hover:-translate-y-1 group-hover:text-gray-300 group-hover:translate-x-1'; // Express routing movement
      if (tech === 'Prisma') return 'group-hover:scale-125 group-hover:text-indigo-400 group-hover:blur-[0.5px] group-hover:brightness-125'; // Prisma's schema clarity
      if (tech === 'NestJS') return 'group-hover:scale-110 group-hover:text-red-500 group-hover:rotate-12 group-hover:-translate-x-1'; // NestJS's modules structure
      return 'group-hover:scale-125 group-hover:text-pink-500 group-hover:skew-y-6 group-hover:rotate-180 group-hover:transition-all duration-700'; // GraphQL's transformative queries
    }
    
    // DevOps effects - container and deployment representations
    if (category === 'DEVOPS') {
      if (tech === 'Docker') return 'group-hover:scale-125 group-hover:text-blue-400 group-hover:rotate-y-180 group-hover:perspective-500 transition-all duration-500'; // Docker's containerization flip
      if (tech === 'AWS') return 'group-hover:scale-110 group-hover:text-yellow-500 group-hover:translate-y-1 group-hover:translate-x-1 group-hover:shadow-yellow-200'; // AWS's cloud movement
      if (tech === 'Vercel') return 'group-hover:text-white group-hover:brightness-150 group-hover:animate-pulse transition-all duration-700'; // Vercel's illumination with subtle pulse
      if (tech === 'GitHub Actions') return 'group-hover:scale-110 group-hover:text-purple-400 group-hover:rotate-45 group-hover:-rotate-45 group-hover:transition-all duration-500'; // GitHub Actions' workflow automation
      return 'group-hover:scale-125 group-hover:text-blue-300 group-hover:skew-x-12 group-hover:brightness-125'; // Kubernetes' orchestration tilt
    }
    
    // Database effects - data storage and retrieval movements
    if (category === 'DATABASE') {
      if (tech === 'MongoDB') return 'group-hover:scale-125 group-hover:text-green-500 group-hover:rotate-6 group-hover:shadow-green-200'; // MongoDB's document rotation
      if (tech === 'PostgreSQL') return 'group-hover:scale-110 group-hover:text-blue-400 group-hover:skew-x-6 group-hover:skew-y-3'; // PostgreSQL's relational twist
      if (tech === 'Firebase') return 'group-hover:scale-125 group-hover:text-yellow-500 group-hover:-translate-y-1 group-hover:brightness-125'; // Firebase's realtime updates
      if (tech === 'Redis') return 'group-hover:scale-110 group-hover:text-red-500 group-hover:blur-[0.5px] group-hover:rotate-12'; // Redis' in-memory speed
      return 'group-hover:scale-125 group-hover:text-blue-400 group-hover:-translate-x-1 group-hover:translate-y-1 group-hover:shadow-blue-200'; // MySQL's structured movement
    }
    
    return 'group-hover:scale-125';
  };

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col">
      <div className="w-full text-center text-xl font-bold md:text-2xl py-5 px-4 z-10">
        <h2 className="text-blue-400 font-blackops group inline-block cursor-pointer">
          <span className="transition-all duration-300 group-hover:text-blue-300 group-hover:brightness-125 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]">Technologies</span>
        </h2>
      </div>
      
      <div className="flex-1 flex flex-col justify-between px-6 pb-8 z-10">
        <div className="mb-6">
          <div className="text-center text-blue-300/80 uppercase text-xs mb-2">FRONTEND</div>
          <div className="grid grid-cols-5 gap-1">
            {categories.FRONTEND.map((tech) => (
              <div key={tech} className="group flex flex-col items-center justify-center">
                <div className={`text-2xl text-blue-400 transition-all duration-300 ${getHoverEffect(tech, 'FRONTEND')}`}>
                  {iconMap[tech]}
                </div>
                <div className="text-[9px] text-center text-white/70 group-hover:text-white transition-colors duration-200 mt-1">
                  {tech}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <div className="text-center text-blue-300/80 uppercase text-xs mb-2">BACKEND</div>
          <div className="grid grid-cols-5 gap-1">
            {categories.BACKEND.map((tech) => (
              <div key={tech} className="group flex flex-col items-center justify-center">
                <div className={`text-2xl text-blue-400 transition-all duration-300 ${getHoverEffect(tech, 'BACKEND')}`}>
                  {iconMap[tech]}
                </div>
                <div className="text-[9px] text-center text-white/70 group-hover:text-white transition-colors duration-200 mt-1">
                  {tech}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">  
          <div className="text-center text-blue-300/80 uppercase text-xs mb-2">DEVOPS</div>
          <div className="grid grid-cols-5 gap-1">
            {categories.DEVOPS.map((tech) => (
              <div key={tech} className="group flex flex-col items-center justify-center">
                <div className={`text-2xl text-blue-400 transition-all duration-300 ${getHoverEffect(tech, 'DEVOPS')}`}>
                      {iconMap[tech]}
                    </div>
                <div className="text-[9px] text-center text-white/70 group-hover:text-white transition-colors duration-200 mt-1">
                      {tech}
                    </div>
                  </div>
                ))}
          </div>
        </div>
        
        <div className="mb-2">
          <div className="text-center text-blue-300/80 uppercase text-xs mb-2">DATABASE</div>
          <div className="grid grid-cols-5 gap-1">
            {categories.DATABASE.map((tech) => (
              <div key={tech} className="group flex flex-col items-center justify-center">
                <div className={`text-2xl text-blue-400 transition-all duration-300 ${getHoverEffect(tech, 'DATABASE')}`}>
                  {iconMap[tech]}
                </div>
                <div className="text-[9px] text-center text-white/70 group-hover:text-white transition-colors duration-200 mt-1">
                  {tech}
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 