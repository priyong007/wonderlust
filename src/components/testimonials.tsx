"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
];

export function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>();

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-background px-4 py-16 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2
              id="testimonials-heading"
              className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-tight font-normal tracking-tight text-foreground"
            >
              What Travelers Say
            </h2>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              Real experiences from our happy travelers
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              aria-label="Previous testimonial"
              className="flex size-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              aria-label="Next testimonial"
              className="flex size-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </header>

        <Carousel setApi={setApi} opts={{ align: "start" }}>
          <CarouselContent className="-ml-5">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="pl-5 md:basis-1/2"
              >
                <article className="flex h-full border border-black/5 bg-white">
                  <div className="flex flex-1 flex-col p-5">
                    <blockquote className="text-[13px] leading-[1.55] text-foreground/70">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <footer className="mt-auto pt-6">
                      <p className="text-[13px] text-brand">
                        &mdash; {testimonial.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </footer>
                  </div>
                  <div className="flex w-[36%] shrink-0 py-5">
                    <div className="relative flex-1">
                      <Image
                        src={testimonial.image}
                        alt={`Portrait of ${testimonial.name}`}
                        fill
                        sizes="(min-width: 768px) 18vw, 36vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
