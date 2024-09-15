import { useEffect, useState } from 'react';
import Link from 'next/link';
import PropertyCard from '../components/PropertyCard';
import SearchBox from '../components/SearchBox';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial featured properties when the page loads
    const fetchFeaturedProperties = async () => {
      const res = await fetch('/api/properties');
      const data = await res.json();
      setFeaturedProperties(data.properties.slice(0, 3)); // Limit to 3 featured properties
      setProperties(data.properties);
      setLoading(false);
    };

    fetchFeaturedProperties();
  }, []);

  const handleSearch = async (searchCriteria) => {
    setLoading(true);
    const { location, priceRange } = searchCriteria;
    let query = `/api/properties?`;

    // Add location to the query if provided
    if (location) {
      query += `location=${location}&`;
    }

    // Add price range to the query if provided
    if (priceRange[0]) {
      query += `priceRange=${priceRange[0]}-${priceRange[1]}&`;
    }

    // Fetch the filtered properties from the API
    const res = await fetch(query);
    const data = await res.json();
    setProperties(data.properties);
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-12 bg-amber-400">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to fauxDoorz</h1>
        <p className="text-lg text-slate-700 mb-8">
          Discover beautiful vacation rentals for your next getaway.
        </p>
        <Link href="/properties" className="bg-green-500 text-white py-2 px-6 rounded-md">
          Browse Properties
        </Link>
      </section>

      {/* Search Box */}
      <section className="px-20">
        <SearchBox onSearch={handleSearch} />
      </section>
      {/* Loading Indicator */}
      {loading && <p className="text-center">Loading properties...</p>}

      {/* Featured Properties */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.length > 0 ? (
            featuredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">
              No featured properties available at the moment.
            </p>
          )}
        </div>
      </section>

      {/* Search Results */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Search Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">
              No properties found matching your search criteria.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
