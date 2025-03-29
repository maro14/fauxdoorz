// components/SearchBox.js
import { useState } from 'react';
import { FiSearch, FiMapPin, FiDollarSign, FiX } from 'react-icons/fi';
import useSearch from '../hooks/useSearch';

export default function SearchBox({ onSearch }) {
  const {
    location,
    setLocation,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    error,
    handleSearch,
  } = useSearch(onSearch);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleClear = () => {
    setLocation('');
    setMinPrice('');
    setMaxPrice('');
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
              className="flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors"
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
                {location && (
                  <button
                    type="button"
                    onClick={() => setLocation('')}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                )}
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

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full py-2.5 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full py-2.5 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FiSearch className="h-5 w-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="absolute -bottom-8 left-0 right-0 text-center">
            <p className="text-sm text-red-500 bg-white/80 backdrop-blur-sm rounded-lg py-1 px-2 inline-block shadow-sm">
              {error}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}