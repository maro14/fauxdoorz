import PropertyTile from '../PropertyTile';
import Link from 'next/link';

export default function FeaturedPropertiesSection({ featuredProperties }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Featured Properties</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover our handpicked selection of exceptional vacation rentals
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.length > 0 ? (
            featuredProperties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300"
              >
                <PropertyTile property={property} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-12">
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-6 text-center max-w-lg mx-auto">
                <p className="text-gray-700 text-lg mb-2">
                  No featured properties available at the moment.
                </p>
                <p className="text-gray-600">
                  Check back soon as we&apos;re adding new properties regularly!
                </p>
              </div>
            </div>
          )}
        </div>
        
        {featuredProperties.length > 0 && (
          <div className="text-center mt-12">
            <Link 
              href="/properties" 
              className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors shadow-md"
            >
              View All Properties
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}