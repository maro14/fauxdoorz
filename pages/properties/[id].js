// pages/properties/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
    return <div className="text-center text-lg font-semibold mt-10 animate-pulse">Loading property details...</div>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  }

  if (!property) {
    return <p className="text-center mt-10">No property found.</p>;
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
              className="w-full h-80 object-cover rounded-lg shadow-md hover:shadow-lg transition"
            />
          ))}
        </div>

        {/* Property Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
            <p className="text-gray-700 text-lg mb-4">{property.description}</p>
            <p className="text-green-500 text-2xl font-bold mb-4">
              ${property.pricePerNight?.toLocaleString()} / night
            </p>
            <p className="text-gray-600">📍 {property.location}</p>
          </div>
          
          {/* Booking Button */}
          <button className="mt-6 bg-green-500 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-green-600 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
