import PropertyTile from '../PropertyTile';

export default function SearchResultsSection({ properties }) {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Search Results</h2>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          {properties.length > 0 
            ? `Found ${properties.length} properties matching your criteria`
            : 'Try adjusting your search filters for more results'}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.length > 0 ? (
            properties.map((property) => (
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
                  No properties found matching your search criteria.
                </p>
                <p className="text-gray-600">
                  Try broadening your search or exploring our featured properties instead.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}