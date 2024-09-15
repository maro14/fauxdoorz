import { useEffect, useState } from 'react';
import Link from 'next/link';
import PropertyCard from '../components/PropertyCard';

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    // Fetch a few featured properties (limit to 3)
    const fetchFeaturedProperties = async () => {
      const res = await fetch('/api/properties');
      const data = await res.json();
      setFeaturedProperties(data.slice(0, 3));  // Show only the first 3 properties
    };

    fetchFeaturedProperties();
  }, []);

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
    </div>
  );
}
