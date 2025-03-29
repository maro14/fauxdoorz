import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaMountain, FaUmbrellaBeach, FaCity, FaHome, FaSnowflake, FaLeaf, FaWater, FaTree } from 'react-icons/fa';
import { faker } from '@faker-js/faker';

export default function PropertyCategoriesSection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Define possible icons with their classes
    const iconOptions = [
      { icon: <FaUmbrellaBeach className="text-4xl text-blue-500" />, id: 'beachfront', bgColor: 'bg-blue-50' },
      { icon: <FaMountain className="text-4xl text-green-700" />, id: 'mountain', bgColor: 'bg-green-50' },
      { icon: <FaCity className="text-4xl text-gray-700" />, id: 'city', bgColor: 'bg-gray-100' },
      { icon: <FaHome className="text-4xl text-yellow-600" />, id: 'luxury', bgColor: 'bg-yellow-50' },
      { icon: <FaSnowflake className="text-4xl text-blue-300" />, id: 'winter', bgColor: 'bg-blue-50' },
      { icon: <FaLeaf className="text-4xl text-green-500" />, id: 'countryside', bgColor: 'bg-green-50' },
      { icon: <FaWater className="text-4xl text-blue-400" />, id: 'lakeside', bgColor: 'bg-blue-50' },
      { icon: <FaTree className="text-4xl text-green-800" />, id: 'forest', bgColor: 'bg-green-50' }
    ];

    // Generate random categories
    const categoryNames = [
      { name: 'Beachfront', description: 'Wake up to ocean views' },
      { name: 'Mountain Retreats', description: 'Cozy cabins with stunning views' },
      { name: 'City Apartments', description: 'In the heart of the action' },
      { name: 'Luxury Villas', description: 'Premium amenities and service' },
      { name: 'Winter Escapes', description: 'Snowy getaways for winter fun' },
      { name: 'Countryside Cottages', description: 'Peaceful rural settings' },
      { name: 'Lakeside Cabins', description: 'Serene waterfront properties' },
      { name: 'Forest Hideaways', description: 'Secluded among the trees' }
    ];

    // Select 4 random categories
    const shuffledCategories = [...categoryNames].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    // Create category objects
    const generatedCategories = shuffledCategories.map((category, index) => {
      const iconOption = iconOptions.find(icon => icon.id.includes(category.name.toLowerCase().split(' ')[0])) || 
                         iconOptions[index % iconOptions.length];
      
      return {
        id: iconOption.id,
        name: category.name,
        description: category.description,
        icon: iconOption.icon,
        bgColor: iconOption.bgColor,
        count: faker.number.int({ min: 8, max: 75 }) // Random property count
      };
    });

    setCategories(generatedCategories);
  }, []);

  if (categories.length === 0) {
    return null; // Don't render until categories are generated
  }

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
              className="block rounded-xl shadow-md transition-all duration-300"
            >
              <div className={`${category.bgColor} p-8 rounded-xl border border-gray-100 h-full flex flex-col`}>
                <div className="mb-4">
                  {category.icon}
                </div>
                <h3 className="font-bold text-xl mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">{category.count} properties</span>
                  <span className="text-orange-500 font-medium">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}