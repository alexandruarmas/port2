"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useEffect, Suspense } from "react";
import dynamic from 'next/dynamic';
import { cn, getImagePath } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./background-gradient-animation";
import { FaWhatsapp } from "react-icons/fa6";
import { MagicButton } from "./magic-button";
import { TechCard } from "../TechCard";
// Import GlobeVisualization dynamically with SSR disabled
const GlobeVisualization = dynamic(() => import("@/app/components/Globe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-64 h-64 rounded-full bg-[#121A40] animate-pulse overflow-hidden">
        {/* Add visual details to make the fallback look more like a globe */}
        <div className="absolute w-16 h-8 rounded-full bg-blue-500/10 top-10 left-10 blur-sm"></div>
        <div className="absolute w-24 h-8 rounded-full bg-blue-500/10 bottom-14 right-12 blur-sm"></div>
        <div className="absolute inset-0 border border-blue-400/20 rounded-full"></div>
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-blue-400/20"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-blue-400/20"></div>
      </div>
    </div>
  ),
});

interface DeckCardProps {
  id: number;
  title: string;
  description?: string;
  img?: string;
  imgClassName?: string;
  className?: string;
  titleClassName?: string;
  spareImg?: string;
}

export const DeckCard = ({
  id,
  title,
  description,
  img,
  imgClassName,
  className,
  titleClassName,
  spareImg,
}: DeckCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [globeLoaded, setGlobeLoaded] = useState(false);
  
  // Override img and spareImg for cards 4 and 5 to force them to be empty
  const actualImg = (id === 4 || id === 5) ? "" : img;
  const actualSpareImg = (id === 4 || id === 5) ? "" : spareImg;

  const handleClick = async () => {
    // More pronounced vibration sequence
    const sequence = [0, -8, 8, -6, 6, -4, 4, -2, 2, 0];
    
    // Reset any ongoing animations
    await controls.stop();
    
    // Execute vibration sequence
    for (const offset of sequence) {
      await controls.start({
        x: offset,
        transition: {
          duration: 0.03,
          ease: "easeInOut"
        }
      });
    }
  };

  const getRandomDirection = useCallback((distance: number) => {
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance
    };
  }, []);

  // Generate random entrance direction once on mount
  const [entranceDirection] = useState(() => getRandomDirection(50));

  useEffect(() => {
    // Set hasEnteredView and trigger entrance animation
    setHasEnteredView(true);
    controls.start({ 
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    });
  }, [controls]);

  // Add loading timeout effect for globe
  useEffect(() => {
    if (id === 2) {
      // Set a minimum delay before showing globe to ensure smoother transition
      const timer = setTimeout(() => {
        setGlobeLoaded(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [id]);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+40726018217";
    const message = "Hello/Salut";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSwipe = useCallback(async () => {
    if (!hasEnteredView) return;
    
    const exitDirection = getRandomDirection(150);
    
    try {
      await controls.start({
        scale: 1.1,
        transition: { duration: 0.3 }
      });
      
      await controls.start({
        x: exitDirection.x,
        y: exitDirection.y,
        rotate: Math.random() * 20 - 10,
        opacity: 0,
        scale: 0.8,
        transition: {
          duration: 0.3,
          ease: [0.32, 0.72, 0, 1]
        }
      });
    } catch (err) {
      controls.start({
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        opacity: 1
      });
    }
  }, [controls, getRandomDirection, hasEnteredView]);

  return (
    <motion.div
      className={cn(
        "group relative h-[400px] w-full cursor-pointer overflow-hidden rounded-3xl border border-white/[0.1] transition-all",
        id === 3 && "h-[420px] lg:h-[450px]",
        id === 6 && "h-[500px] md:h-[550px]",
        className
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      onDoubleClick={handleSwipe}
      initial={{ 
        opacity: 0,
        x: entranceDirection.x,
        y: entranceDirection.y,
        scale: 0.8
      }}
      animate={controls}
      style={{
        opacity: hasEnteredView ? 1 : 0,
        scale: id === 3 ? 1 : (isHovered && id !== 2 ? 1.02 : 1)
      }}
      whileHover={id === 3 || id === 2 || id === 5 ? {} : {
        scale: 1.02,
        transition: {
          duration: 0.3,
          ease: "easeOut"
        }
      }}
    >
      {id !== 3 && id !== 2 && id !== 4 && (
        <BackgroundGradientAnimation
          gradientBackgroundStart={id % 2 === 0 ? "rgb(2, 6, 23)" : "rgb(4, 7, 29)"}
          gradientBackgroundEnd={id % 2 === 0 ? "rgb(8, 10, 40)" : "rgb(12, 14, 35)"}
          firstColor={id % 2 === 0 ? "124, 58, 237" : "76, 29, 149"}
          secondColor={id % 2 === 0 ? "99, 102, 241" : "46, 16, 101"}
          thirdColor={id % 2 === 0 ? "139, 92, 246" : "93, 58, 201"}
          interactive={true}
          containerClassName="opacity-70"
          className="!absolute inset-0 h-full w-full transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
      {id === 2 && (
        <>
          <BackgroundGradientAnimation
            gradientBackgroundStart="rgb(1, 2, 20)"
            gradientBackgroundEnd="rgb(2, 6, 30)"
            firstColor="50, 20, 100"
            secondColor="30, 10, 70"
            thirdColor="60, 30, 150"
            interactive={true}
            containerClassName="opacity-90"
            className="!absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 backdrop-blur-sm">
            <div className="absolute inset-0 flex flex-col items-center p-4 md:p-6">
              <h3 className="text-base md:text-xl font-bold font-blackops text-center mb-4 md:mb-6 group cursor-pointer">
                <span className="text-blue-400 transition-all duration-300 group-hover:text-blue-300 group-hover:brightness-125 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]">{title}</span>
              </h3>
              <div className="flex-1 w-full flex items-center justify-center">
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-blue-900/40 animate-pulse"></div>
                  </div>
                }>
                  <GlobeVisualization />
                </Suspense>
              </div>
            </div>
          </div>
        </>
      )}
      {id === 3 && (
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(1, 2, 20)"
          gradientBackgroundEnd="rgb(2, 6, 30)"
          firstColor="50, 20, 100"
          secondColor="30, 10, 70"
          thirdColor="60, 30, 150"
          interactive={false}
          containerClassName="opacity-90"
          className="!absolute inset-0 h-full w-full"
        />
      )}

      <div className={cn("h-full", id === 6 && "flex justify-center")}>
        <div className="absolute inset-0 h-full w-full">
          {actualImg && id !== 2 && id !== 3 && id !== 4 && id !== 5 && id !== 6 && (
            <Image
              width={689}
              height={541}
              src={getImagePath(actualImg)}
              alt={actualImg}
              className={cn(
                "h-full w-full object-cover object-center transition-transform duration-500",
                imgClassName,
                isHovered && id !== 3 && id !== 2 ? "scale-110" : "scale-100"
              )}
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
          {actualSpareImg && id !== 2 && id !== 3 && id !== 4 && id !== 5 && id !== 6 && (
            <Image
              width={208}
              height={96}
              src={getImagePath(actualSpareImg)}
              alt={actualSpareImg}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />
          )}
        </div>

        {/* Glass container for ID 6 */}
        {id === 6 && (
          <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 backdrop-blur-sm">
            {/* Phone-like container that maintains width on larger screens */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Container glow effect */}
              <div className="absolute w-full h-full bg-black/20 blur-2xl rounded-full"></div>
              <div className="w-full h-full bg-transparent overflow-hidden relative z-10">
                {/* Content */}
                <div className="flex flex-col h-full">
                  {/* Title section */}
                  <div className="w-full px-6 py-4">
                    <h2 className="text-xl md:text-2xl font-bold font-blackops text-center mt-5 group cursor-pointer">
                      <span className="text-blue-400 transition-all duration-300 group-hover:text-blue-300 group-hover:brightness-125 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]">Vrei să începem un proiect împreună?</span>
                    </h2>
                  </div>
                  
                  {/* Message visualization */}
                  <div className="flex-1 w-full px-4 md:px-6 flex flex-col justify-center space-y-4 md:space-y-5">
                    {/* Chat bubbles */}
                    <div className="flex justify-start animate-[slideInLeft_15s_ease-in-out_infinite]">
                      <div className="bg-[#202c33] text-white px-4 md:px-5 py-3 md:py-4 rounded-lg rounded-tl-none text-sm md:text-base max-w-[70%] hover:scale-105 transition-transform duration-300">
                        Salut! Dorești să discutăm despre un proiect?
                      </div>
                    </div>
                    <div className="flex justify-end animate-[slideInRight_18s_ease-in-out_infinite]">
                      <div className="bg-[#005c4b] text-white px-4 md:px-5 py-3 md:py-4 rounded-lg rounded-tr-none text-sm md:text-base max-w-[70%] hover:scale-105 transition-transform duration-300">
                        Da, am nevoie de un website profesional!
                      </div>
                    </div>
                    <div className="flex justify-start animate-[slideInLeft_20s_ease-in-out_infinite]">
                      <div className="bg-[#202c33] text-white px-4 md:px-5 py-3 md:py-4 rounded-lg rounded-tl-none text-sm md:text-base max-w-[70%] hover:scale-105 transition-transform duration-300">
                        Perfect! Te pot ajuta cu asta.
                        <div className="text-xs text-gray-400 text-right mt-1">11:24 ✓✓</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact section */}
                  <div className="w-full p-4 md:p-6">
                    <div 
                      className="group/button w-[45%] mx-auto animate-[pulse_2s_ease-in-out_infinite]"
                      onClick={(e: React.MouseEvent) => e.stopPropagation()} 
                      onMouseEnter={(e: React.MouseEvent) => e.stopPropagation()}
                      onMouseLeave={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                      <MagicButton
                        title="Scrie-mi Mesaj"
                        icon={<FaWhatsapp className="text-sm mr-1" />}
                        otherClasses="!bg-[#00a884] hover:!bg-[#02735E] text-white w-full justify-center transition-all duration-300 text-sm px-1.5 py-0.5 shadow-lg shadow-[#00a884]/20"
                        handleClick={() => handleWhatsAppClick()}
                        asChild
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className={cn(
            "relative flex min-h-40 flex-col p-5 px-5 transition duration-200",
            id !== 3 && id !== 2 && id !== 4 && id !== 5 && id !== 6 && "group-hover:translate-x-2", 
            "md:h-full lg:p-10",
            titleClassName
          )}
        >
          {description && id !== 3 && id !== 4 && id !== 5 && id !== 6 && (
            <p className="max-w-full text-sm text-white/60 font-andika">
              {description}
            </p>
          )}

          {id !== 3 && id !== 2 && id !== 4 && id !== 5 && id !== 6 && (
            <div className={cn(
              "z-10 max-w-96 font-sans text-lg font-bold font-blackops lg:text-3xl group cursor-pointer",
              "transition-all duration-300"
            )}>
              <span className="text-blue-400 transition-all duration-300 group-hover:text-blue-300 group-hover:brightness-125 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]">{title}</span>
            </div>
          )}

          {id === 3 && <TechCard isVisible={true} />}
        </div>
      </div>

      {/* Card 5 - JavaScript Stack Code Design */}
      {id === 5 && (
        <>
          {/* Dark code editor with transparent background */}
          <BackgroundGradientAnimation
            gradientBackgroundStart="rgb(1, 2, 20)"
            gradientBackgroundEnd="rgb(4, 6, 30)"
            firstColor="50, 60, 160"
            secondColor="30, 40, 100" 
            thirdColor="20, 30, 80"
            interactive={true}
            containerClassName="opacity-90"
            className="!absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 backdrop-blur-sm bg-black/20">
            {/* Editor chrome */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-black/30 backdrop-blur-sm border-b border-white/10 flex items-center px-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff0000]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffff00]"></div>
                <div className="w-3 h-3 rounded-full bg-[#0000ff]"></div>
              </div>
              <div className="ml-4 text-xs text-gray-300 font-mono">stack.js</div>
              <div className="absolute right-3 text-xs text-gray-400 font-mono">JavaScript</div>
            </div>
            
            {/* File explorer sidebar */}
            <div className="absolute top-8 left-0 bottom-0 w-12 bg-black/20 backdrop-blur-sm border-r border-white/10 flex flex-col items-center pt-3 gap-4">
              <div className="w-5 h-5 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <div className="w-5 h-5 text-[#42a5f5]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div className="w-5 h-5 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </div>
              <div className="w-5 h-5 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
            </div>
            
            {/* Main code area */}
            <div className="absolute top-8 left-12 right-0 bottom-0 overflow-hidden font-mono text-base bg-black/10 backdrop-blur-sm">
              {/* Line numbers */}
              <div className="absolute top-0 left-0 bottom-0 w-8 bg-black/20 flex flex-col items-end pr-2 pt-3 text-gray-400 text-xs">
                {Array(20).fill(0).map((_, i) => (
                  <div key={i} className="h-6">{i + 1}</div>
                ))}
              </div>
              
              {/* Code content */}
              <div className="pl-10 pt-3 pr-4 h-[200%] relative">
                <div className="animate-[scrollDown_20s_linear_infinite]">
                  <pre className="text-[#d4d4d4] leading-6">
                    <div><span className="text-[#c586c0]">class</span> <span className="text-[#4ec9b0]">Stack</span> {'{'}</div>
                    <div>&nbsp;&nbsp;<span className="text-[#c586c0]">constructor</span>() {'{'}</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#9cdcfe]">this</span>.<span className="text-[#9cdcfe]">items</span> = [];</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#9cdcfe]">this</span>.<span className="text-[#9cdcfe]">count</span> = <span className="text-[#b5cea8]">0</span>;</div>
                    <div>&nbsp;&nbsp;{'}'}</div>
                    <div>&nbsp;</div>
                    <div>&nbsp;&nbsp;<span className="text-[#dcdcaa]">push</span>(<span className="text-[#9cdcfe]">element</span>) {'{'}</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#9cdcfe]">this</span>.<span className="text-[#9cdcfe]">items</span>[<span className="text-[#9cdcfe]">this</span>.<span className="text-[#9cdcfe]">count</span>] = <span className="text-[#9cdcfe]">element</span>;</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#9cdcfe]">this</span>.<span className="text-[#9cdcfe]">count</span>++;</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c586c0]">return</span> <span className="text-[#9cdcfe]">this</span>.<span className="text-[#9cdcfe]">count</span> - <span className="text-[#b5cea8]">1</span>;</div>
                    <div>&nbsp;&nbsp;{'}'}</div>
                    <div>&nbsp;</div>
                    <div>&nbsp;&nbsp;<span className="text-[#dcdcaa]">pop</span>() {'{'}</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c586c0]">if</span> (<span className="text-[#9cdcfe]">this</span>.<span className="text-[#9cdcfe]">isEmpty</span>()) {'{'}</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c586c0]">return</span> <span className="text-[#ce9178]">&quot;Stack is empty&quot;</span>;</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;{'}'}</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#9cdcfe]">this</span>.<span className="text-[#9cdcfe]">count</span>--;</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c586c0]">const</span> <span className="text-[#9cdcfe]">result</span> = <span className="text-[#9cdcfe]">this</span>.<span className="text-[#9cdcfe]">items</span>[<span className="text-[#9cdcfe]">this</span>.<span className="text-[#9cdcfe]">count</span>];</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c586c0]">delete</span> <span className="text-[#9cdcfe]">this</span>.<span className="text-[#9cdcfe]">items</span>[<span className="text-[#9cdcfe]">this</span>.<span className="text-[#9cdcfe]">count</span>];</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c586c0]">return</span> <span className="text-[#9cdcfe]">result</span>;</div>
                    <div>&nbsp;&nbsp;{'}'}</div>
                    <div>{'}'}</div>
                  </pre>
                </div>
              </div>
            </div>
            
            {/* Terminal output */}
            <div className="absolute left-16 right-6 bottom-6 h-40 bg-black/30 backdrop-blur-md rounded-md border border-white/10 overflow-hidden transform -skew-y-2">
              <div className="bg-black/40 h-8 px-3 flex items-center text-xs text-gray-300 font-mono border-b border-white/10">
                Terminal
              </div>
              <div className="p-4 text-xs font-mono">
                <div className="text-green-400 mb-2">$ node stack.js</div>
                <div className="text-white mb-2">Stack initialized</div>
                <div className="text-white mb-2 break-words">
                  Pushed element: 
                  <span className="text-yellow-300 inline-block">Dezvolt o bibliotecă de animații <span className="font-bold text-sm">#JavaScript</span></span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400">$</span>
                  <span className="w-1.5 h-3 bg-white ml-1 animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Tech Card (ID 4) */}
      {id === 4 && (
        <>
          <BackgroundGradientAnimation
            gradientBackgroundStart="rgb(0, 0, 10)"
            gradientBackgroundEnd="rgb(3, 6, 23)"
            firstColor="76, 29, 149"
            secondColor="32, 80, 170" 
            thirdColor="90, 55, 160"
            interactive={true}
            containerClassName="opacity-90"
            className="!absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Glass morphism container */}
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute right-0 top-0 w-72 h-72 bg-purple-700/10 rounded-full blur-3xl"></div>
              <div className="absolute left-0 bottom-0 w-72 h-72 bg-blue-700/10 rounded-full blur-3xl"></div>
            </div>
            
            {/* Floating 3D elements */}
            <div className="absolute top-8 right-8 w-28 h-28 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-xl border border-white/5 backdrop-blur-sm transform rotate-12 animate-first shadow-lg shadow-purple-500/10"></div>
            <div className="absolute bottom-16 left-8 w-16 h-16 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-lg border border-white/5 backdrop-blur-sm transform -rotate-6 animate-second shadow-lg shadow-blue-500/10"></div>
            
            {/* Dynamic dots grid */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-12 gap-4 h-full w-full p-8">
                {Array(24).fill(0).map((_, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute w-1 h-1 rounded-full ${i % 3 === 0 ? 'bg-purple-400' : i % 3 === 1 ? 'bg-blue-400' : 'bg-indigo-400'} animate-pulse`} 
                      style={{
                        top: `${(Math.sin(i * 0.5) * 30) + 50}%`, 
                        left: `${(Math.cos(i * 0.5) * 30) + 50}%`,
                        animationDuration: `${2 + (i % 3)}s`,
                        animationDelay: `${i * 0.2}s`
                      }}></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Code Editor Snippet with improved design */}
            <div className="absolute left-6 top-20 bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-2xl shadow-purple-500/10 text-[9px] text-blue-300/90 font-mono transform -rotate-2 w-56 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/20">
              <div className="flex items-center gap-1.5 mb-2.5">
                <div className="w-2 h-2 rounded-full bg-red-400/90"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400/90"></div>
                <div className="w-2 h-2 rounded-full bg-green-400/90"></div>
                <span className="ml-2 text-[8px] text-white/60">App.tsx</span>
              </div>
              <div className="text-left space-y-1">
                <div><span className="text-pink-400">import</span> <span className="text-blue-300">React</span> <span className="text-pink-400">from</span> <span className="text-green-300">&apos;react&apos;</span>;</div>
                <div><span className="text-pink-400">import</span> {'{'} <span className="text-yellow-300">Portfolio</span> {'}'} <span className="text-pink-400">from</span> <span className="text-green-300">&apos;./components&apos;</span>;</div>
                <div className="mt-2"><span className="text-pink-400">export default function</span> <span className="text-blue-300">App</span>() {'{'}
                </div>
                <div>&nbsp;&nbsp;<span className="text-pink-400">return</span> (</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-300">div</span> <span className="text-blue-200">className</span>=<span className="text-green-300">&quot;app&quot;</span>&gt;</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-300">Portfolio</span> /&gt;</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-yellow-300">div</span>&gt;</div>
                <div>&nbsp;&nbsp;);</div>
                <div>{'}'}</div>
              </div>
            </div>
            
            {/* Tech showcase section */}
            <div className="absolute bottom-6 right-6 backdrop-blur-md bg-white/5 p-4 rounded-xl border border-white/10 shadow-lg w-44">
              <h4 className="text-[10px] font-medium text-white/60 uppercase tracking-wider mb-2.5">Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Framer'].map((tech, i) => (
                  <span key={i} 
                    className="text-[9px] px-2 py-1 rounded-md border transition-all duration-300 hover:scale-105 hover:shadow-inner"
                    style={{
                      background: `rgba(${i % 2 ? '76, 29, 149' : '32, 80, 170'}, 0.1)`,
                      borderColor: `rgba(${i % 2 ? '76, 29, 149' : '32, 80, 170'}, 0.2)`,
                      color: i % 2 ? 'rgb(216, 180, 254)' : 'rgb(191, 219, 254)'
                    }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            {/* Interactive loading bar */}
            <div className="absolute bottom-20 left-6 w-32 h-1.5 bg-black/30 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
              <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
            
            {/* Lines connecting elements */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
              <line x1="30%" y1="30%" x2="70%" y2="70%" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <line x1="70%" y1="30%" x2="30%" y2="70%" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            </svg>
          </div>
          
          {/* Tech Card Title - Increased z-index and adjusted positioning */}
          <div className="absolute top-0 left-0 z-50 p-6">
            <div className="relative flex items-center">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-blackops drop-shadow-md group inline-block cursor-pointer">
                <span className="text-blue-400 transition-all duration-300 group-hover:text-blue-300 group-hover:brightness-125 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]">{title}</span>
              </h3>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}; 