// components/SearchBox.js
import { useState } from 'react';

export default function SearchBox({ onSearch }) {
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    // Step 1: Validate inputs before triggering search
    if (minPrice !== '' && maxPrice !== '' && Number(minPrice) > Number(maxPrice)) {
      setError('Min price cannot be greater than max price');
      return;
    }

    // Step 2: Build search criteria object
    const searchCriteria = {
      location: location.trim(),
      priceRange: [minPrice || 0, maxPrice || Infinity], // default to full range if no input
    };

    setError(null); // Clear previous errors
    onSearch(searchCriteria); // Trigger search function passed from parent component
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
          />
        </div>

        {/* Min Price Input */}
        <div className="w-full md:w-1/3 mb-2 md:mb-0">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="Min Price"
          />
        </div>

        {/* Max Price Input */}
        <div className="w-full md:w-1/3 mb-2 md:mb-0">
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="Max Price"
          />
        </div>

        {/* Search Button */}
        <div className="w-full md:w-auto mt-2 md:mt-0">
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-6 rounded-md w-full md:w-auto text-sm"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
