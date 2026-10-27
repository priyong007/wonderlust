
"use client";

import React, { useEffect, useState } from "react";
import { MapPin, CalendarDays, ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Destination {
  _id?: string;
  id?: number | string;
  destinationName?: string;
  name?: string;
  country?: string;
  category?: string;
  price?: number | string;
  duration?: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
  rating?: number;
}

export default function AddDestinationPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("http://localhost:8000/destination");

        if (!res.ok) {
          throw new Error("Failed to fetch destinations.");
        }

        const data = await res.json();

        // API সরাসরি array অথবা { destinations: [...] } দিতে পারে
        const items = Array.isArray(data)
          ? data
          : data.destinations;

        if (!Array.isArray(items)) {
          throw new Error("Invalid destination data received.");
        }

        setDestinations(items);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white px-3 py-4">
        <p className="text-sm text-gray-500">
          Loading destinations...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white px-3 py-4">
        <p className="text-sm text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className=" min-h-screen bg-white px-10 py-4 text-black">
      <h4 className="text-3xl font-bold">Explore All Destinations</h4>
      <p className="mb-6 text-[16px] text-gray-500">
        Showing {destinations.length} destinations
      </p>

      {destinations.length === 0 ? (
        <p className="text-sm text-gray-500">
          No destinations available.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination, index) => (
            <article
              key={destination.id ?? `${destination.destinationName ?? destination.name}-${index}`}
              className="min-w-0"
            >
              <div className="relative h-9.3rem w-full overflow-hidden bg-gray-100">
                {destination.imageUrl ? (
                  <Image
                  height={100}
                  width={100}
                    src={destination.imageUrl}
                    alt={destination.destinationName ?? destination.name ?? "Travel destination"}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-400">
                    No image available
                  </div>
                )}

                <div className="absolute right-2 top-3 flex items-center gap-1 bg-white/90 px-2 py-1 text-[11px]">
                  <span>{destination.rating ?? 4.5}</span>
                  <Star className="h-3 w-3 fill-black text-black" />
                </div>
              </div>

              <div className="pt-3">
                <div className="mb-1 flex items-center gap-1 text-[11px] text-gray-500">
                  <MapPin className="h-3 w-3" />
                  <span>{destination.country || "Unknown country"}</span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-[14px] leading-5">
                    {destination.destinationName ??
                      destination.name ??
                      "Untitled destination"}
                  </h2>

                  <p className="shrink-0 text-[14px] leading-5">
                    ${Number(destination.price ?? 0).toLocaleString()}
                    <span className="text-[10px] text-gray-500">
                      /Person
                    </span>
                  </p>
                </div>

                <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-600">
                  <CalendarDays className="h-3 w-3" />
                  <span>{destination.duration || "Duration not specified"}</span>
                </div>

                <Link
                  href={`/destination/${destination._id}`}
                  className="mt-3 inline-flex items-center gap-2 text-[11px] font-medium text-cyan-600 underline underline-offset-2 hover:text-cyan-800"
                >
                  BOOK NOW
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
