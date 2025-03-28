import { useEffect, useState } from 'react';
import Link from 'next/link';
import PropertyTile from '../components/PropertyTile';
import SearchBox from '../components/SearchBox';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Fetch featured properties on component mount
  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  // Function to fetch featured properties
  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/properties');
      if (!res.ok) throw new Error('Failed to fetch properties');

      const data = await res.json();
      setFeaturedProperties(data.slice(0, 6)); // Limit to 6 featured properties

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

  // Function to handle search queries
  const handleSearch = async (searchCriteria) => {
    setLoading(true);
    setSearchPerformed(true); // Mark that search has been performed
    setError(null); // Reset error state

    const { location, priceRange } = searchCriteria;
    let query = '/api/properties?';

    if (location) {
      query += `location=${encodeURIComponent(location)}&`;
    }
    if (Array.isArray(priceRange) && priceRange.length > 0) {
      query += `priceRange=${priceRange[0]}-${priceRange[1]}&`;
    }

    try {
      const res = await fetch(query);
      if (!res.ok) throw new Error('Failed to fetch search results');

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

  // Hero Section Component
  const HeroSection = () => (
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
        <h1 className="text-5xl text-white font-bold mb-4 py-6">Welcome to fauxDoorz</h1>
        <p className="text-lg text-white mb-8">Discover beautiful vacation rentals for your next getaway.</p>
        <Link href="/properties" className="bg-green-500 text-white py-2 px-6 rounded-md">
          Browse Properties
        </Link>
        {/* Search Box */}
        <div className="mt-8">
          <SearchBox onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );

  // Featured Properties Section Component
  const FeaturedPropertiesSection = () => (
    <section className="mx-4 my-12">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-wide">
        Featured Properties
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProperties.length > 0 ? (
          featuredProperties.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              <PropertyTile property={property} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 col-span-full text-lg font-medium">
            No featured properties available at the moment.
          </p>
        )}
      </div>
    </section>
  );

  // Search Results Section Component
  const SearchResultsSection = () => (
    <section className="mt-12 mx-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Search Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyTile key={property._id} property={property} />
          ))
        ) : (
          <p className="text-center text-white col-span-3">
            No properties found matching your search criteria.
          </p>
        )}
      </div>
    </section>
  );

  return (
    <div className="container mx-auto ">
      {/* Hero Section */}
      <HeroSection />

      {/* Loading Indicator */}
      {loading && <p className="text-center">Loading properties...</p>}

      {/* Error Display */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Featured Properties Section */}
      <FeaturedPropertiesSection />

      {/* Search Results Section - Only Show if Search is Performed */}
      {searchPerformed && <SearchResultsSection />}
    </div>
  );
}