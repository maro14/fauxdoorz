import PropertyTile from '../PropertyTile';

export default function FeaturedPropertiesSection({ featuredProperties }) {
  return (
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
}