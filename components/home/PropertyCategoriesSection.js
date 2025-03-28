import Link from 'next/link';
import Image from 'next/image';
import { FaMountain, FaUmbrellaBeach, FaCity, FaHome, FaSnowflake, FaLeaf } from 'react-icons/fa';

export default function PropertyCategoriesSection() {
  const categories = [
    {
      id: 'beachfront',
      name: 'Beachfront',
      description: 'Wake up to ocean views',
      icon: <FaUmbrellaBeach className="text-3xl text-blue-500" />,
      image: '/images/categories/beach.jpg',
    },
    {
      id: 'mountain',
      name: 'Mountain Retreats',
      description: 'Cozy cabins with stunning views',
      icon: <FaMountain className="text-3xl text-green-700" />,
      image: '/images/categories/mountain.jpg',
    },
    {
      id: 'city',
      name: 'City Apartments',
      description: 'In the heart of the action',
      icon: <FaCity className="text-3xl text-gray-700" />,
      image: '/images/categories/city.jpg',
    },
    {
      id: 'luxury',
      name: 'Luxury Villas',
      description: 'Premium amenities and service',
      icon: <FaHome className="text-3xl text-yellow-600" />,
      image: '/images/categories/luxury.jpg',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Browse by Category</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Find the perfect property type for your next getaway
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              href={`/properties?category=${category.id}`}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 transform group-hover:-translate-y-2 transition-transform duration-300">
                    <div className="flex items-center mb-2">
                      {category.icon}
                      <h3 className="font-bold text-xl ml-3">{category.name}</h3>
                    </div>
                    <p className="text-gray-600">{category.description}</p>
                    <div className="mt-3 text-orange-500 font-medium group-hover:underline">
                      Explore properties →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}