import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to handle paths with basePath for GitHub Pages
export function getImagePath(path: string) {
  const basePath = process.env.NODE_ENV === 'production' ? '/port2' : '';
  return `${basePath}${path}`;
}
