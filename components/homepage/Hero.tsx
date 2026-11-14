"use client";

import * as React from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

const slides = [
  {
    eyebrow: "YOUR NEIGHBOURHOOD LIBRARY, ONLINE",
    title: "Add a book. Borrow a book. Return a book.",
    text: "Browse a shelf built by readers like you, take a title home for a few days and pass it on when you are done.",
    covers: ["/book1.jpg", "/book2.jpg", "/book3.jpg"],
  },
  {
    eyebrow: "BORROW FOR A FEW DAYS",
    title: "Take a great read home.",
    text: "Pick any available title, confirm in one step and keep it until the return date.",
    covers: ["/book4.jpg", "/book5.jpg", "/book6.jpg"],
  },
  {
    eyebrow: "SHARE YOUR SHELF",
    title: "Lend the books you love.",
    text: "Add your own books with a cover and the number of copies, and let other readers borrow them.",
    covers: ["/book7.jpg", "/book8.jpg", "/book9.jpg"],
  },
];

export default function HeroSlider() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api) return;

    const id = setInterval(() => api.scrollNext(), 5000);

    return () => clearInterval(id);
  }, [api]);

  return (
    <section className="relative mx-3 my-4 max-w-7xl overflow-hidden rounded-2xl bg-forest sm:mx-4 sm:rounded-[28px] md:mx-auto">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        aria-label="BookNook featured books"
      >
        <CarouselContent className="ml-0">
          {slides.map((s) => (
            <CarouselItem key={s.title} className="pl-0">
              <div className="flex flex-col-reverse items-center gap-7 px-5 pt-7 pb-16 sm:gap-10 sm:px-8 sm:pt-10 sm:pb-20 md:flex-row md:gap-12 md:p-16 md:pb-24">
                {/* Text Content */}
                <div className="w-full flex-1 text-center md:text-left">
                  <p className="text-[10px] font-bold tracking-[0.13em] text-gold sm:text-xs">
                    {s.eyebrow}
                  </p>

                  <h1 className="mx-auto my-3 max-w-xl font-heading text-[30px] leading-[1.15] font-bold text-paper sm:my-4 sm:text-4xl md:mx-0 md:text-6xl">
                    {s.title}
                  </h1>

                  <p className="mx-auto mb-5 max-w-md text-sm leading-relaxed text-paper/85 sm:mb-7 sm:text-base md:mx-0 md:text-lg">
                    {s.text}
                  </p>

                  <Link
                    href="/books"
                    className="inline-block rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-ink transition hover:brightness-95 sm:py-3 sm:text-base"
                  >
                    Browse Books
                  </Link>
                </div>

                {/* Book Covers */}

                <div className="flex w-full flex-1 items-center justify-center gap-3 py-2 sm:gap-4 md:p-4">
                  {s.covers.map((cover, index) => (
                    <div
                      key={cover}
                      className={`relative overflow-hidden rounded-md shadow-xl transition-transform duration-300 hover:-translate-y-2
                      h-36 w-24 sm:h-44 sm:w-28 md:w-40
                      ${
                        index === 0
                          ? "-rotate-6"
                          : index === 1
                            ? "-mt-5 h-40 w-26 rotate-0 sm:h-48 md:-mt-8 md:h-68 md:w-44"
                            : "rotate-6"
                      }`}
                    >
                      <Image
                        src={cover}
                        alt={`Book cover ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 76px, (max-width: 768px) 96px, 128px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 md:bottom-10 md:left-16 md:translate-x-0">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 bg-gold"
                : "w-3 bg-[#6f9c8c] hover:bg-paper/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
