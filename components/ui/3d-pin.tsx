"use client";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isTouching, setIsTouching] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = (ref.current as HTMLElement).getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    setRotateY(mouseX * 20);
    setRotateX(mouseY * -20);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!ref.current || !isTouching) return;
    const touch = e.touches[0];
    const rect = (ref.current as HTMLElement).getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const touchX = (touch.clientX - rect.left) / width - 0.5;
    const touchY = (touch.clientY - rect.top) / height - 0.5;
    setRotateY(touchX * 15); // Reduce rotation amount for touch
    setRotateX(touchY * -15);
  };

  const handleTouchStart = () => {
    setIsTouching(true);
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    handleMouseLeave();
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Subtle automatic animation when component mounts
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const animate = () => {
      setRotateY(2);
      setRotateX(-2);
      
      timeoutId = setTimeout(() => {
        setRotateY(0);
        setRotateX(0);
      }, 1000);
    };
    
    animate();
    return () => clearTimeout(timeoutId);
  }, []);

  const springConfig = { stiffness: 150, damping: 15 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        rotateX: springRotateX,
        rotateY: springRotateY,
      }}
      className={cn(
        "relative cursor-pointer w-full h-full m-0 p-0 overflow-hidden shadow-xl rounded-lg",
        containerClassName
      )}
    >
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(0px)",
        }}
        className="w-full h-full m-0 p-0"
      >
        <div className="w-full h-full m-0 p-0 overflow-hidden rounded-lg">
          <div className={cn("w-full h-full m-0 p-0", className)}>
            {children}
          </div>
        </div>
      </motion.div>
      <div className="absolute top-0 left-0 w-full z-10 opacity-0 hover:opacity-100 p-0 m-0 transition-opacity">
        <Link
          href={href || ""}
          target="_blank"
          className="flex items-center justify-center w-full"
        >
          <span className="bg-zinc-950 text-white text-xs font-bold py-1 px-4 rounded-full">
            {title || "Vizitează"}
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

export const PinPerspective = ({
  title,
  href,
  children,
}: {
  title?: string;
  href?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const [isTouching, setIsTouching] = useState(false);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 50 });

  const rotateX = useTransform(
    mouseYSpring,
    [0, 1],
    [15, -15]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [0, 1],
    [-15, 15]
  );

  const diagonalMovement = useTransform<number, number>(
    [rotateX, rotateY],
    ([newRotateX, newRotateY]) => {
      return newRotateX * 0.5 + newRotateY * 0.5;
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = (ref.current as HTMLElement).getBoundingClientRect();
    const newX = (e.clientX - rect.left) / rect.width;
    const newY = (e.clientY - rect.top) / rect.height;
    x.set(newX);
    y.set(newY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!ref.current || !isTouching) return;
    const touch = e.touches[0];
    const rect = (ref.current as HTMLElement).getBoundingClientRect();
    const newX = (touch.clientX - rect.left) / rect.width;
    const newY = (touch.clientY - rect.top) / rect.height;
    x.set(newX);
    y.set(newY);
  };

  const handleTouchStart = () => {
    setIsTouching(true);
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    // Return to center position
    x.set(0.5);
    y.set(0.5);
  };

  // Subtle automatic animation when component mounts
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const animate = () => {
      x.set(0.6);
      y.set(0.4);
      
      timeoutId = setTimeout(() => {
        x.set(0.5);
        y.set(0.5);
      }, 1000);
    };
    
    animate();
    return () => clearTimeout(timeoutId);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-full w-full cursor-pointer perspective-[1200px]"
      style={{
        perspective: 1200,
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full rounded-lg"
      >
        <PinContainer title={title} href={href} containerClassName="shadow-2xl">
          {children}
        </PinContainer>
      </motion.div>
    </motion.div>
  );
};
