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
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-orange-200 opacity-25"></div>
          <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-lg font-medium text-gray-700 mt-6">Discovering perfect getaways...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md border border-gray-100">
          <FaExclamationCircle className="text-5xl text-orange-500 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-3">Oops! Something went wrong</h2>
          <p className="text-gray-600 text-center">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Find Your <span className="text-orange-500">Perfect Stay</span>
          </h1>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore our handpicked collection of beautiful vacation rentals for your next adventure.
          </p>
        </div>

        {/* Filters - Optional UI enhancement */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-10 max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-medium hover:bg-orange-200 transition-colors">
              All Properties
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
              Beachfront
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
              Mountain View
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
              City Center
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
              Pet Friendly
            </button>
          </div>
        </div>

        {/* Property Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {properties.map((property) => (
              <div key={property._id} className="transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center max-w-2xl mx-auto shadow-md border border-gray-100">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHome className="text-4xl text-orange-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">No properties available</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We&apos;re currently updating our inventory with new amazing properties. Please check back soon for exciting new listings!
            </p>
            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors shadow-md hover:shadow-lg font-medium">
              Notify Me When Available
            </button>
          </div>
        )}
      </div>
    </div>
  );
}