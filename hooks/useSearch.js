import { useState } from 'react';

export default function useSearch(onSearch) {
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

    console.log('Location:', location);
    console.log('Min Price:', minPrice);
    console.log('Max Price:', maxPrice);

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
      priceRange: minPrice && maxPrice ? [min, max] : undefined,
    };

    console.log('Search Criteria:', searchCriteria);

    // Trigger search with validated criteria
    onSearch(searchCriteria);
  };

  return {
    location,
    setLocation,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    error,
    handleSearch,
  };
}