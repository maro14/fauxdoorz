// components/SearchBox.js
import { useState } from 'react';

export default function SearchBox({ onSearch }) {
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    // Reset previous errors
    setError(null);

    // Validate price inputs
    const min = Number(minPrice);
    const max = Number(maxPrice);

    if (minPrice && maxPrice && min > max) {
      setError('Minimum price cannot be greater than maximum price');
      return;
    }

    if ((minPrice && min < 0) || (maxPrice && max < 0)) {
      setError('Price values cannot be negative');
      return;
    }

    // Build search criteria
    const searchCriteria = {
      location: location.trim(),
      priceRange: minPrice && maxPrice ? [min, max] : undefined, // Ensuring priceRange is an array
    };

    // Trigger search with validated criteria
    onSearch(searchCriteria);
  };

  return (
    <form onSubmit={handleSearch} className="bg-gray-200 p-4 rounded-lg shadow-md mb-9">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="flex flex-col md:flex-row md:space-x-4 items-center">
        {/* Location Input */}
        <div className="w-full md:w-1/3 mb-2 md:mb-0">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="Location"
            aria-label="Search by location"
          />
        </div>

        {/* Min Price Input */}
        <div className="w-full md:w-1/3 mb-2 md:mb-0">
          <input
            type="number"
            min="0"
            step="1"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value.replace(/[^0-9]/g, ''))}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="Min Price"
            aria-label="Minimum price"
          />
        </div>

        {/* Max Price Input */}
        <div className="w-full md:w-1/3 mb-2 md:mb-0">
          <input
            type="number"
            min="0"
            step="1"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value.replace(/[^0-9]/g, ''))}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="Max Price"
            aria-label="Maximum price"
          />
        </div>

        {/* Search Button */}
        <div className="w-full md:w-auto mt-2 md:mt-0">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md w-full md:w-auto text-sm transition-colors duration-200"
            aria-label="Search properties"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}