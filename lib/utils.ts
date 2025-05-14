import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to handle paths with basePath for GitHub Pages
export function getImagePath(path: string) {
  const basePath = process.env.NODE_ENV === 'production' ? '/port2' : '';
  const fullPath = `${basePath}${path}`;
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Base Path:', basePath);
  console.log('Image Path:', path);
  console.log('Full Path:', fullPath);
  return fullPath;
}
