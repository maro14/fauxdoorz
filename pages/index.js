import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import HeroSection from '../components/home/HeroSection';
import FeaturedPropertiesSection from '../components/home/FeaturedPropertiesSection';
import SearchResultsSection from '../components/home/SearchResultsSection';
import PropertyCategoriesSection from '../components/home/PropertyCategoriesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import NewsletterSection from '../components/home/NewsletterSection';

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
    <div className="full-width-container">
      {/* Hero Section */}
      <div className="full-bleed">
        <HeroSection onSearch={handleSearch} />
      </div>

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

      {/* Search Results Section - Only Show if Search is Performed */}
      {searchPerformed && !loading && (
        <div className="px-4 sm:px-6 lg:px-8 max-w-[2000px] mx-auto">
          <SearchResultsSection properties={properties} />
        </div>
      )}

      {/* Only show these sections if no search has been performed */}
      {!searchPerformed && (
        <>
          {/* How It Works Section */}
          <HowItWorksSection />

          {/* Featured Properties Section */}
          {!loading && (
            <div className="px-4 sm:px-6 lg:px-8 max-w-[2000px] mx-auto">
              <FeaturedPropertiesSection featuredProperties={featuredProperties} />
            </div>
          )}

          {/* Property Categories Section */}
          <PropertyCategoriesSection />

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* Newsletter Section */}
          <NewsletterSection />
        </>
      )}
    </div>
  );
}