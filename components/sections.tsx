interface SectionProps {
  title: string;
  subtitle: string;
}

export const Section = ({ title, subtitle }: SectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-center text-white md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-xl text-center text-white/60 font-andika">
        {subtitle}
      </p>
    </div>
  );
}; 