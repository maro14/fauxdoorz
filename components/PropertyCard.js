// components/PropertyCard.js (Enhanced UI & Image Optimization)
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PropertyCard({ property }) {
  const [isBooked, setIsBooked] = useState(!property.available);

  const handleBooking = async () => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId: property._id }),
    });

    if (res.ok) {
      setIsBooked(true);
    } else {
      alert('Booking failed!');
    }
  };

  return (
    <Link href={`/properties/${property._id}`} passHref>
      <div className="relative border p-4 rounded-lg shadow-lg bg-white transition hover:shadow-xl flex flex-col cursor-pointer">
        {/* Optimized Image */}
        <Image src={property.images[0]} alt={property.title} width={500} height={300} 
          className="w-full h-48 object-cover rounded-lg transition-transform transform hover:scale-105" />

        {/* Property Details */}
        <div className="flex-grow text-center mt-4">
          <h2 className="text-2xl font-bold text-gray-800">{property.title}</h2>
          <p className="text-gray-600">{property.location}</p>
          <p className="text-lg font-semibold text-green-600 mt-2">${property.price} per night</p>
        </div>

        {/* Availability Badge */}
        <div className="flex justify-center mt-4">
          <div className={`px-3 py-1 text-sm font-bold rounded-full ${isBooked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
            {isBooked ? 'Booked' : 'Available'}
          </div>
        </div>

        {/* Quick Booking Button */}
        {!isBooked && (
          <div className="mt-4 mb-2 text-center">
            <button onClick={handleBooking} className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition">
              Book Now
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}
