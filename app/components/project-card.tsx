import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  link,
}: ProjectCardProps) {
  return (
    <div className="group rounded-lg border border-white/10 bg-gray-900 p-5 transition-all hover:bg-gray-800">
      <Link href={link} target="_blank" rel="noopener noreferrer">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="mt-2 text-gray-400">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-700 px-3 py-1 text-xs text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
} 