import Image from 'next/image';
import Link from 'next/link';
import { MapPin, CalendarDays, Star, ArrowLeft, Check } from 'lucide-react';
import EdirDestinationDialouge from '@/components/EdirDestinationDialouge';
import DeleteDestinationDialouge from '@/components/DeleteDestination';

import BookingCard from '@/components/booking/BookingCard';

import { getTokenFromServer } from '@/lib/getTokenFromServer';

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const token = await getTokenFromServer()
  

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`,{
    headers: {
      authorization: `Bearer ${token}`,
    },
    
  });
  console.log(res)
  if (!res.ok) {
    throw new Error('Failed to fetch destination');
  }


  const data = await res.json();
  const destination = data.result;

  if (!destination) {
    return <div className="mx-auto max-w-7xl p-8">Destination not found.</div>;
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl bg-white px-5 py-5 text-black md:px-8">
      {/* Top actions */}
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/destination"
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-black"
        >
          <ArrowLeft size={15} />
          Back to Destinations
        </Link>

        <div className="flex gap-2">
          <EdirDestinationDialouge destination={destination} />
          <DeleteDestinationDialouge id={id} />
        </div>
      </div>

      {/* Destination image */}
      <div className="relative h-60 w-full overflow-hidden bg-gray-100 md:h-90">
        {destination.imageUrl ? (
          <Image
            src={destination.imageUrl}
            alt={destination.destinationName ?? 'Destination'}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No image available
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 border-t border-gray-100 pt-6 md:grid-cols-[1fr_220px]">
        {/* Main details */}
        <section>
          <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
            <MapPin size={13} />
            {destination.country ?? 'Unknown country'}
          </div>

          <h1 className="text-3xl font-normal tracking-tight md:text-4xl">
            {destination.destinationName ?? 'Untitled destination'}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="flex items-center gap-1 font-semibold">
              <Star size={13} className="fill-green-600 text-green-600" />
              {destination.rating ?? '4.9'}
            </span>
            <span className="text-gray-400">(234 reviews)</span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1">
              <CalendarDays size={13} />
              {destination.duration ?? 'Duration not specified'} Days / Nights
            </span>
          </div>

          <h2 className="mt-6 text-lg font-medium">Overview</h2>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-gray-500">
            {destination.description ??
              'Explore this destination and discover its unique attractions.'}
          </p>

          <h2 className="mt-5 text-lg font-medium">Highlights</h2>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-gray-500">
            Discover local attractions, culture, and unforgettable experiences
            during your visit to {destination.destinationName}.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 text-xs text-gray-600 sm:grid-cols-2">
            {[
              'Explore local attractions',
              'Discover local culture',
              'Enjoy scenic views',
              'Experience local cuisine',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check size={13} className="text-green-600" />
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Booking card */}
        <BookingCard destination={destination}/>
      </div>
    </main>
  );
};

export default DestinationDetailsPage;
