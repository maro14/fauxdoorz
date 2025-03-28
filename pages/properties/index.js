// pages/properties/index.js
import { useEffect, useState } from 'react';
import PropertyCard from '../../components/PropertyTile';
import { FaHome, FaExclamationCircle, FaSpinner } from 'react-icons/fa';

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch('/api/properties');
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Failed to load properties');
        }
        setProperties(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-lg font-semibold text-gray-700">Loading properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-red-500">
        <FaExclamationCircle className="text-6xl mb-4" />
        <p className="text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-10 m-10">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-16">
        <FaHome className="text-4xl text-green-500 mb-4" />
        <h1 className="text-3xl font-bold text-center text--800">Available Properties</h1>
        <p className="text-white-600 mt-2">Explore our wide range of properties for your next stay.</p>
      </div>

      {/* Property Grid */}
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-[50vh] text-gray-700">
          <FaHome className="text-6xl mb-4" />
          <p className="text-xl">No properties available at the moment.</p>
        </div>
      )}
    </div>
  );
}