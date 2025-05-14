import Image from "next/image";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { companies, testimonials } from "@/data";

export const Clients = () => {
  return (
    <section id="testimonials" className="section-spacing">
      <div className="flex flex-col items-center">
        <h1 className="heading-rye">
          Recenziile <span className="text-purple">clienților mei</span>
        </h1>

        <div className="-mt-20 relative flex h-auto min-h-[40vh] flex-col items-center justify-center overflow-hidden rounded-md antialiased md:h-[28rem]">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            pauseOnHover={true}
          />
        </div>

        <div className="-mt-8 flex flex-wrap items-center justify-center gap-4 px-4 md:gap-12">
          {companies.map(({ id, img, name, nameImg }) => (
            <div key={id} className="m-2 flex max-w-32 gap-2 md:max-w-60">
              <Image
                height={29}
                width={43}
                src={img}
                alt={`${name}'s logo`}
                className="w-5 md:w-10"
              />

              <Image
                height={28}
                width={131}
                src={nameImg}
                alt={name}
                className="w-20 md:w-24"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
