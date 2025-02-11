// components/PropertyCard.js
import Image from 'next/image';
import Link from 'next/link';
import { FaCircle, FaMapMarkerAlt, FaDollarSign, FaCalendarCheck } from 'react-icons/fa';

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
      alert('Booking successful!');
    } else {
      alert('Booking failed!');
    }
  };

  // Check if status is valid before using toLowerCase
  const isBooked = status?.toLowerCase?.() === 'booked';

  return (
    <Link href={`/properties/${_id}`} passHref>
      <div className="relative border p-4 rounded-lg shadow-lg bg-white transition hover:shadow-2xl flex flex-col cursor-pointer">
        {/* Image Container with Status Badge */}
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={title}
            width={500}
            height={300}
            className="w-full h-48 object-cover rounded-lg"
            placeholder="blur"
            blurDataURL="/images/placeholder-blur.jpg"
            priority
          />
          {/* Status Badge Overlay */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 ${
                isBooked ? 'bg-red-500' : 'bg-green-500'
              } text-white`}
            >
              <FaCircle className="w-2 h-2" />
              {isBooked ? 'Booked' : 'Available'}
            </span>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex-grow mt-4">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{title}</h2>
          <div className="flex items-center justify-center text-gray-600 mt-2">
            <FaMapMarkerAlt className="mr-1 text-red-500" />
            <p className="text-sm">{location}</p>
          </div>
          <div className="flex items-center justify-center text-green-600 mt-2">
            <FaDollarSign className="mr-1" />
            <p className="text-lg font-semibold">${pricePerNight.toLocaleString()} per night</p>
          </div>
        </div>

        {/* Booking Button */}
        <div className="mt-4 mb-2 text-center">
          <button
            className={`py-2 px-6 rounded-md transition w-full ${
              isBooked
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white flex items-center justify-center gap-2`}
            disabled={isBooked}
            onClick={handleBooking}
          >
            {isBooked ? (
              <>
                <FaCircle className="w-3 h-3 text-red-500" />
                Not Available
              </>
            ) : (
              <>
                <FaCalendarCheck className="w-4 h-4" />
                Book Now
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}