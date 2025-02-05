// components/SearchBox.js
import { useState } from 'react';
import { FiSearch, FiMapPin, FiDollarSign } from 'react-icons/fi';

export default function SearchBox({ onSearch }) {
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

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
    <div className="max-w-2xl mx-auto px-4">
      <form onSubmit={handleSearch} className="relative">
        {/* Main Search Container */}
        <div className={`bg-white rounded-3xl shadow-md transition-all duration-300 ${isExpanded ? 'rounded-2xl' : ''}`}>
          {/* Collapsed View */}
          {!isExpanded && (
            <div 
              onClick={() => setIsExpanded(true)}
              className="flex items-center p-3 cursor-pointer"
            >
              <div className="flex items-center flex-1 px-4">
                <FiSearch className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-400">Search properties...</span>
              </div>
            </div>
          )}

          {/* Expanded View */}
          {isExpanded && (
            <div className="p-4 space-y-4">
              {/* Location Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <FiMapPin className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border-0 focus:ring-0 rounded-full bg-gray-50"
                  placeholder="Where to?"
                />
              </div>

              {/* Price Range */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <FiDollarSign className="h-5 w-5" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full pl-10 pr-4 py-2.5 border-0 focus:ring-0 rounded-full bg-gray-50"
                    placeholder="Min price"
                  />
                </div>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <FiDollarSign className="h-5 w-5" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full pl-10 pr-4 py-2.5 border-0 focus:ring-0 rounded-full bg-gray-50"
                    placeholder="Max price"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-2.5 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <FiSearch className="h-5 w-5" />
                <span>Search</span>
              </button>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="absolute -bottom-8 left-0 right-0 text-center">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
      </form>
    </div>
  );
}