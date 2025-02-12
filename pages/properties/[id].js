// pages/properties/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaDollarSign, FaCalendarCheck } from 'react-icons/fa';

export default function PropertyDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchProperty() {
      try {
        const res = await fetch(`/api/properties/${id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Failed to load property details');
        }
        setProperty(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
          <p className="text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-red-500">
        <p className="text-xl">Error: {error}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-gray-700">
        <p className="text-xl">No property found.</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Explore Properties
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-10">
        {/* Property Image Gallery */}
        <div className="space-y-4">
          {property.images?.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={property.title}
              width={800}
              height={500}
              className="w-full h-80 object-cover rounded-lg shadow-md hover:shadow-lg transition duration-300"
            />
          ))}
        </div>

        {/* Property Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
            <p className="text-gray-700 text-lg mb-4">{property.description}</p>
            <div className="flex items-center text-green-500 text-2xl font-bold mb-4">
              <FaDollarSign className="mr-2" />
              {property.pricePerNight?.toLocaleString()} / night
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <FaMapMarkerAlt className="mr-2 text-red-500" />
              {property.location}
            </div>
          </div>

          {/* Booking Button */}
          <button className="mt-6 bg-green-500 text-white py-3 px-6 rounded-md text-lg font-semibold flex items-center justify-center hover:bg-green-600 transition duration-300">
            <FaCalendarCheck className="mr-2" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}