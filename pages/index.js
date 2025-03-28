import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import HeroSection from '../components/home/HeroSection';
import FeaturedPropertiesSection from '../components/home/FeaturedPropertiesSection';
import SearchResultsSection from '../components/home/SearchResultsSection';

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

  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <HeroSection onSearch={handleSearch} />

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner size="lg" color="orange" />
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center max-w-2xl mx-auto my-8">
          {error}
        </div>
      )}

      {/* Featured Properties Section */}
      {!loading && <FeaturedPropertiesSection featuredProperties={featuredProperties} />}

      {/* Search Results Section - Only Show if Search is Performed */}
      {searchPerformed && !loading && (
        <SearchResultsSection properties={properties} />
      )}
    </div>
  );
}