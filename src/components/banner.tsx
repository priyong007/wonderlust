import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Input } from "@/components/ui/input";

const searchFields = [
  {
    id: "search-location",
    label: "Location",
    placeholder: "Address, City Or Zip",
  },
  { id: "search-date", label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { id: "search-budget", label: "Budget", placeholder: "$0-$3000" },
  { id: "search-people", label: "People", placeholder: "5-10" },
];

export function Banner() {
  return (
    <section className="relative isolate flex min-h-400px flex-1 flex-col overflow-hidden">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/8" aria-hidden="true" />

      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-10 lg:py-16">
        <div className="flex max-w-3xl flex-col items-center text-center">
          <h1 className="font-heading text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[1.05] tracking-tight text-white">
            Discover Your
            <br />
            Next Adventure
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/85 sm:text-[15px]">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href="#destinations"
              className="inline-flex h-10 items-center justify-center gap-3 bg-brand px-5 text-xs font-medium tracking-wide text-white uppercase transition-colors hover:bg-brand/90"
            >
              Explore Now
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#destinations"
              className="inline-flex h-10 items-center justify-center bg-white/30 px-5 text-xs font-medium tracking-wide text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/40"
            >
              View Destination
            </a>
          </div>
        </div>
      </div>

      <form
        role="search"
        className="relative z-10 flex w-full flex-col bg-black/25 backdrop-blur-[2px] md:flex-row"
      >
        {searchFields.map((field) => (
          <div
            key={field.id}
            className="flex-1 border-b border-white/15 px-4 py-2.5 last:border-b-0 md:border-r md:border-b-0 md:px-5 md:py-3"
          >
            <label
              htmlFor={field.id}
              className="block text-[11px] leading-4 text-white/65"
            >
              {field.label}
            </label>
            <Input
              id={field.id}
              name={field.id}
              placeholder={field.placeholder}
              autoComplete="off"
              className="mt-0.5 h-6 rounded-none border-0 bg-transparent p-0 text-sm text-white shadow-none placeholder:text-white/80 focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-brand px-12 py-4 text-sm font-medium text-white transition-colors hover:bg-brand/90 md:py-0"
        >
          Search
        </button>
      </form>
    </section>
  );
}
