import { useState } from 'react';

export default function useSearch(onSearch) {
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    // Reset previous errors
    setError(null);

    // Validate price inputs
    const min = Number(minPrice);
    const max = Number(maxPrice);

    // Validation checks
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
      minPrice: minPrice ? min : undefined,
      maxPrice: maxPrice ? max : undefined,
    };

    // Show loading state
    setIsSearching(true);
    
    // Trigger search with validated criteria
    onSearch(searchCriteria)
      .finally(() => {
        setIsSearching(false);
      });
  };

  const resetSearch = () => {
    setLocation('');
    setMinPrice('');
    setMaxPrice('');
    setError(null);
  };

  return {
    location,
    setLocation,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    error,
    isSearching,
    handleSearch,
    resetSearch,
  };
}