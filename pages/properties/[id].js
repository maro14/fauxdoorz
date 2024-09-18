import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function PropertyDetails() {
  const router = useRouter();
  const { id } = router.query; // Get the property ID from the URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // If no ID, return early

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
    return <p className="text-center mt-10">Loading property details...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  }

  if (!property) {
    return <p className="text-center mt-10">No property found.</p>;
  }

  return (
    <div className="container mx-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-10">
        {/* Property Images */}
        <div className="flex flex-col space-y-4 space-x-3">
          {property.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={property.title}
              width={500} // Specify the width
              height={300} // Specify the height
              className="w-full h-64 object-cover"
            />
          ))}
        </div>

        {/* Property Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{property.description}</p>
          <p className="text-green-500 text-2xl font-bold mb-4">${property.price} / night</p>
          <p className="text-gray-600 mb-4">Location: {property.location}</p>
          {/* Add any additional details you want here */}
        </div>
      </div>
    </div>
  );
}