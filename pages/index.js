import { useEffect, useState } from 'react';
import Link from 'next/link';
import PropertyCard from '../components/PropertyCard';
import SearchBox from '../components/SearchBox';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true); // Start with true
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false); // 🔄 Tracks whether search was performed

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/properties');
      if (!res.ok) throw new Error('Failed to fetch properties');
      
      const data = await res.json();
      setFeaturedProperties(data.slice(0, 6));
      
      if (!data.length) {
        setError('No featured properties found.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchCriteria) => {
    setLoading(true);
    setSearchPerformed(true); // ✅ Mark that search has been performed
    setError(null); // Reset error state

    const { location, priceRange } = searchCriteria;
    let query = `/api/properties?`;

    if (location) {
      query += `location=${location}&`;
    }

    if (Array.isArray(priceRange) && priceRange.length > 0) {
      query += `priceRange=${priceRange[0]}-${priceRange[1]}&`;
    }

    try {
      const res = await fetch(query);
      if (!res.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await res.json();

      if (data && data.length > 0) {
        setProperties(data);
      } else {
        setProperties([]); // Reset properties if no results
        setError('No properties found for your search criteria.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto bg-orange-300 mb-4">
      {/* Hero Section */}
      <section
        className="text-center mb-12 border-none relative flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(/House.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
        <div className="relative z-10">
          <h1 className="text-5xl text-white font-bold mb-4 py-6">
            Welcome to fauxDoorz
          </h1>
          <p className="text-lg text-white mb-8">
            Discover beautiful vacation rentals for your next getaway.
          </p>
          <Link href="/properties" className="bg-green-500 text-white py-2 px-6 rounded-md">
            Browse Properties
          </Link>

          {/* Search Box */}
          <div className="mt-8">
            <SearchBox onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Loading Indicator */}
      {loading && <p className="text-center">Loading properties...</p>}

      {/* Error Display */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Featured Properties */}
      <section className="mx-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.length > 0 ? (
            featuredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          ) : (
            <p className="text-center text-white col-span-3">
              No featured properties available at the moment.
            </p>
          )}
        </div>
      </section>

      {/* Search Results - Only Show if Search is Performed */}
      {searchPerformed && (
        <section className="mt-12 mx-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.length > 0 ? (
              properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            ) : (
              <p className="text-center text-white col-span-3">
                No properties found matching your search criteria.
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
