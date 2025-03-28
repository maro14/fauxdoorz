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
      className="relative flex flex-col items-center justify-center mb-12"
      style={{
        backgroundImage: `url(/House.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '90vh',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center md:text-left md:max-w-3xl">
        <h1 className="text-4xl md:text-6xl text-white font-bold mb-4 leading-tight">
          Find Your Perfect <span className="text-orange-500">Vacation Home</span>
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl">
          Discover beautiful vacation rentals in top destinations worldwide. Book unique homes and experiences all around the globe.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
          <Link 
            href="/properties" 
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-lg font-medium transition-colors shadow-lg"
          >
            Browse Properties
          </Link>
          <Link 
            href="/host" 
            className="bg-white hover:bg-gray-100 text-gray-900 py-3 px-8 rounded-lg font-medium transition-colors shadow-lg"
          >
            Become a Host
          </Link>
        </div>
      </div>
      
      {/* Search Box - Positioned at bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20 px-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-5xl mx-auto overflow-hidden">
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
          <p className="text-center text-gray-700 col-span-full py-8 text-lg font-medium">
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