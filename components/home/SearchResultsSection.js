import PropertyTile from '../PropertyTile';

export default function SearchResultsSection({ properties }) {
  return (
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
}