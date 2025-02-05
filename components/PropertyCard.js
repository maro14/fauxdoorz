// components/PropertyCard.js (Enhanced UI & Image Optimization)

import Image from 'next/image';
import Link from 'next/link';
import { FaCircle } from 'react-icons/fa';

export default function PropertyCard({ property }) {
  const {
    _id,
    title,
    location,
    pricePerNight,
    images,
    status = 'available'
  } = property;

  // Use the first image or a placeholder
  const imageUrl = images?.[0] || '/images/placeholder.jpg';

  const handleBooking = async () => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId: _id }),
    });

    if (res.ok) {
      // Handle successful booking
    } else {
      alert('Booking failed!');
    }
  };

  // Check if status is valid before using toLowerCase
  const isBooked = status?.toLowerCase?.() === 'booked';

  return (
    <Link href={`/properties/${_id}`} passHref>
      <div className="relative border p-4 rounded-lg shadow-lg bg-white transition hover:shadow-xl flex flex-col cursor-pointer">
        {/* Image Container with Status Badge */}
        <div className="relative">
          <Image
            src={imageUrl}
            alt={title}
            width={500}
            height={300}
            className="w-full h-48 object-cover rounded-lg transition-transform transform hover:scale-105"
            priority
          />
          {/* Status Badge Overlay */}
          <div className="absolute top-4 right-4">
            <span className="bg-green-500 px-3 py-1 text-sm font-bold rounded-full text-white flex items-center gap-2">
              <FaCircle className="w-2 h-2" />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex-grow text-center mt-4">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600">{location}</p>
          <p className="text-lg font-semibold text-green-600 mt-2">
            ${pricePerNight.toLocaleString()} per night
          </p>
        </div>

        {/* Booking Button */}
        <div className="mt-4 mb-2 text-center">
          <button 
            className={`py-2 px-6 rounded-md transition ${
              isBooked 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
            disabled={isBooked}
            onClick={handleBooking}
          >
            {isBooked ? 'Not Available' : 'Book Now'}
          </button>
        </div>
      </div>
    </Link>
  );
}
