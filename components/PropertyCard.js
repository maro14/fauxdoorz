// components/PropertyCard.js (Enhanced UI & Image Optimization)

import Image from 'next/image';
import Link from 'next/link';
import StatusBadge from './common/StatusBadge';

export default function PropertyCard({ property }) {
  const { title, location, price, status = 'available', imageUrl } = property || {};

  const handleBooking = async () => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId: property._id }),
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
    <Link href={`/properties/${property._id}`} passHref>
      <div className="relative border p-4 rounded-lg shadow-lg bg-white transition hover:shadow-xl flex flex-col cursor-pointer">
        {/* Image Container with Status Badge */}
        <div className="relative">
          <Image
            src={imageUrl || '/images/placeholder.jpg'} // Update this path
            alt={title || 'Property'}
            width={500}
            height={300}
            className="w-full h-48 object-cover rounded-lg transition-transform transform hover:scale-105"
            priority // Add this for important images
          />
          {/* Status Badge Overlay */}
          <div className="absolute top-4 right-4">
            <StatusBadge status={status || 'available'} />
          </div>
        </div>

        {/* Property Details */}
        <div className="flex-grow text-center mt-4">
          <h2 className="text-2xl font-bold text-gray-800">{title || 'Untitled Property'}</h2>
          <p className="text-gray-600">{location || 'Location not specified'}</p>
          <p className="text-lg font-semibold text-green-600 mt-2">
            ${price || 0} per night
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
