import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import PropertyForm from '@/components/dashboard/PropertyForm';

export default function Dashboard() {
  const { data: session } = useSession();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/properties/user');
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch properties');
      }
      
      setProperties(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchProperties();
    }
  }, [session]);

  const handlePropertyAdded = () => {
    fetchProperties();
  };

  const resetFormData = {
    title: '',
    description: '',
    location: '',
    pricePerNight: '',
    images: [],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 1,
    amenities: []
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="grid gap-8">
        <PropertyForm 
          onPropertyAdded={handlePropertyAdded}
          initialData={resetFormData}
        />
        
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Your Properties</h2>
          {properties.length === 0 ? (
            <p className="text-gray-500">No properties listed yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <div 
                  key={property._id}
                  className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
                >
                  <h3 className="font-semibold">{property.title}</h3>
                  <p className="text-gray-600 mt-2">{property.location}</p>
                  <p className="text-orange-600 font-medium mt-2">
                    ${property.pricePerNight} per night
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Dashboard.auth = true;