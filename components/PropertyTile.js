import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaCircle, FaMapMarkerAlt, FaDollarSign, FaCalendarCheck, FaStar, FaBed, FaBath } from 'react-icons/fa';
import { Button } from './ui/Button';

export default function PropertyTile({ property }) {
  const {
    _id,
    title,
    location,
    pricePerNight,
    images,
    status = 'available',
    bedrooms,
    bathrooms,
    rating = 4.5
  } = property;

  const [isBooking, setIsBooking] = useState(false);
  const imageUrl = images?.[0] || '/images/placeholder.jpg';
  const isBooked = status?.toLowerCase?.() === 'booked';

  const handleBooking = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isBooked || isBooking) return;
    
    setIsBooking(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId: _id }),
      });
      
      if (!res.ok) throw new Error('Booking failed');
      
      // You might want to use a toast notification instead
      alert('Booking successful!');
    } catch (error) {
      alert(error.message || 'Booking failed!');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <Link href={`/properties/${_id}`} passHref>
      <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            placeholder="blur"
            blurDataURL="/images/placeholder-blur.jpg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3 z-10">
            <span className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 ${
              isBooked ? 'bg-red-500' : 'bg-green-500'
            } text-white shadow-md`}>
              <FaCircle className="w-2 h-2" />
              {isBooked ? 'Booked' : 'Available'}
            </span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-1 text-xs font-bold rounded-md bg-yellow-400 text-gray-800 flex items-center">
              <FaStar className="mr-1" />
              {rating}
            </span>
          </div>
        </div>

        {/* Property Details */}
        <div className="p-4 flex-grow">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-1 mb-2">{title}</h2>
          
          <div className="flex items-center text-gray-600 mb-2">
            <FaMapMarkerAlt className="mr-1 text-orange-500 flex-shrink-0" />
            <p className="text-sm line-clamp-1">{location}</p>
          </div>

          <div className="flex items-center gap-4 text-gray-600 mb-3">
            {bedrooms && (
              <div className="flex items-center gap-1">
                <FaBed />
                <span>{bedrooms} beds</span>
              </div>
            )}
            {bathrooms && (
              <div className="flex items-center gap-1">
                <FaBath />
                <span>{bathrooms} baths</span>
              </div>
            )}
          </div>

          <div className="flex items-center text-orange-500 font-bold">
            <FaDollarSign className="mr-1" />
            <span className="text-lg">{pricePerNight.toLocaleString()}</span>
            <span className="text-gray-500 text-sm font-normal ml-1">/ night</span>
          </div>
        </div>

        {/* Booking Button */}
        <div className="p-4 pt-0">
          <Button
            onClick={handleBooking}
            disabled={isBooked || isBooking}
            variant={isBooked ? 'secondary' : 'default'}
            fullWidth
          >
            {isBooked ? (
              <>
                <FaCircle className="w-3 h-3 text-red-500 mr-2" />
                Not Available
              </>
            ) : isBooking ? (
              <span className="flex items-center">
                <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              <>
                <FaCalendarCheck className="mr-2" />
                Book Now
              </>
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
}