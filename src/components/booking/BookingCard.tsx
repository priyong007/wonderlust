
'use client'
import { ArrowLeft, Check } from "lucide-react";
import { Input } from "../ui/input";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

type BookingCardProps = {
  destination: {
    _id: string;
    destinationName: string;
    price: number | string;
    departureDate?: string | null;
    country: string;
    category: string;
    duration: string;
    imageUrl: string;
    description: string;
  };
};

const BookingCard = ({destination} : BookingCardProps) => {

   
    
    const { data: session } = authClient.useSession();
    
      const user = session?.user;
      console.log(user);

      const handleBooking = async (
  e: React.FormEvent<HTMLFormElement>
): Promise<void> => {
    e.preventDefault()

     const formData = new FormData(e.currentTarget);
  const departureDate = formData.get("departureDate") as string;
    console.log(departureDate)

    const data = {
        username: user?.name,
        email: user?.email,
        image: user?.image,
        ...destination,
        departureDate: departureDate,
        bookingDate: new Date()
    }
    console.log(data)

     const res = await fetch('http://localhost:8000/booking', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   })

   const bookingRes = await res.json();
   console.log(bookingRes);
   toast.success('Succesfully added')
   redirect('/my-booking')


   

}

    return (
        <div>
            <aside className="h-fit border border-gray-100 p-3 shadow-sm">
          <p className="text-[11px] text-gray-500">Starting from</p>
          <p className="text-2xl font-semibold text-cyan-600">
            ${Number(destination.price ?? 0).toLocaleString()}
          </p>
          <p className="text-[10px] text-gray-500">per person</p>

          <form onSubmit={handleBooking} action="">
          <Input
            type="date"
            name="departureDate"
            defaultValue={destination.departureDate?.slice(0, 10) ?? ''}
            
            className="my-4 rounded-none border-gray-100 bg-gray-50 text-xs"
          />

          
          <button type="submit" className="flex w-full items-center justify-center gap-2 bg-cyan-600 py-3 text-xs text-white hover:bg-cyan-700">
            Book Now
            <ArrowLeft size={14} className="rotate-180" />
          </button>

          </form>


          <ul className="mt-3 space-y-2 text-[10px] text-gray-500">
            <li className="flex items-center gap-2">
              <Check size={12} className="text-green-600" />
              Explore with confidence
            </li>
            <li className="flex items-center gap-2">
              <Check size={12} className="text-green-600" />
              Plan your trip easily
            </li>
            <li className="flex items-center gap-2">
              <Check size={12} className="text-green-600" />
              Destination details included
            </li>
          </ul>
        </aside>
        </div>
    );
};

export default BookingCard;