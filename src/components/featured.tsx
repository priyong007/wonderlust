
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  CalendarDays,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';
import Image from 'next/image';

type Destination = {
  _id?: string;
  id?: string;
  destinationName: string;
  country: string;
  price: number | string;
  duration: number | string;
  imageUrl: string;
};

const Featured = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/featured-destination`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch destinations');
        }

        const data = await res.json();
        const items = Array.isArray(data) ? data : data.result;

        setDestinations(Array.isArray(items) ? items : []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Something went wrong'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    carouselRef.current?.scrollBy({
      left: direction === 'right' ? 460 : -460,
      behavior: 'smooth',
    });
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <p className="text-sm text-gray-500">
          Loading featured destinations...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-sm text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      {/* Section heading */}
      <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6 sm:gap-4">
        <div className="min-w-0">
          <h2 className="text-xl font-medium tracking-tight text-neutral-900 sm:text-2xl md:text-3xl">
            Featured Destinations
          </h2>

          <p className="mt-1 text-[10px] text-neutral-500 sm:text-xs">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>

        <Link
          href="/destination"
          className="flex shrink-0 items-center gap-1.5 border border-sky-300 px-2 py-2 text-[8px] font-medium uppercase tracking-wide text-sky-600 transition hover:bg-sky-500 hover:text-white sm:gap-2 sm:px-3 sm:text-[9px]"
        >
          <span className="hidden xs:inline">All </span>
          Destinations
          <ArrowRight size={12} />
        </Link>
      </div>

      {/* Destination carousel */}
      <div
        ref={carouselRef}
        className="destination-carousel flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 sm:gap-4"
      >
        {destinations.map((destination) => {
          const destinationId = destination._id ?? destination.id;

          const nights = Number(destination.duration);
          const durationLabel =
            destination.duration !== '' && Number.isFinite(nights)
              ? `${nights + 1} Days/${nights} Nights`
              : destination.duration;

          const detailHref = destinationId
            ? `/destination/${destinationId}`
            : '/destination';

          return (
            <article
              key={destinationId ?? destination.destinationName}
              className="w-70 shrink-0 snap-start sm:w-85 lg:w-110"
            >
              {/* Image */}
              <Link
                href={detailHref}
                className="group relative block h-55 overflow-hidden bg-neutral-100 sm:h-70 lg:h-100"
              >
                <Image
                  width={880}
                  height={800}
                  src={destination.imageUrl}
                  alt={destination.destinationName}
                  sizes="(max-width: 639px) 280px, (max-width: 1023px) 340px, 440px"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute right-2 top-2 flex items-center gap-1 bg-white/95 px-2 py-1 text-[10px] font-medium text-neutral-900">
                  4.5 <Star size={11} fill="currentColor" />
                </span>
              </Link>

              {/* Destination details */}
              <div className="pt-3">
                <p className="flex items-center gap-1 text-[10px] text-neutral-500 sm:text-xs">
                  <MapPin size={11} />
                  {destination.country}
                </p>

                <div className="mt-1 flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium text-neutral-900 sm:text-base">
                    {destination.destinationName}
                  </h3>

                  <p className="shrink-0 text-sm font-medium text-neutral-900 sm:text-base">
                    ${Number(destination.price).toLocaleString()}
                    <span className="text-[9px] font-normal text-neutral-500 sm:text-[10px]">
                      /Person
                    </span>
                  </p>
                </div>

                <p className="mt-1 flex items-center gap-1 text-[10px] text-neutral-500 sm:text-xs">
                  <CalendarDays size={12} />
                  {durationLabel}
                </p>

                <Link
                  href={detailHref}
                  className="mt-3 inline-flex items-center gap-1 text-[10px] font-medium text-sky-600 underline-offset-4 hover:underline sm:text-xs"
                >
                  BOOK NOW
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* Carousel footer */}
      <div className="mt-5 flex items-center gap-3 sm:gap-4">
        <span className="shrink-0 text-xs text-neutral-700">
          {destinations.length > 0
            ? `1/${destinations.length}`
            : '0/0'}
        </span>

        <div className="h-px flex-1 bg-neutral-200" />

        <button
          type="button"
          onClick={() => scrollCarousel('left')}
          aria-label="Previous destinations"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition hover:bg-neutral-100"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          type="button"
          onClick={() => scrollCarousel('right')}
          aria-label="Next destinations"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition hover:bg-neutral-100"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default Featured;
