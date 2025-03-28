import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { FaUpload, FaTimes, FaSpinner, FaWifi, FaParking, FaSwimmingPool, FaDumbbell, FaSnowflake, FaTv, FaUtensils, FaWater } from 'react-icons/fa';

export default function PropertyForm({ onPropertyAdded, initialData }) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    location: initialData?.location || '',
    pricePerNight: initialData?.pricePerNight || '',
    images: initialData?.images || [],
    bedrooms: initialData?.bedrooms || 1,
    bathrooms: initialData?.bathrooms || 1,
    maxGuests: initialData?.maxGuests || 1,
    amenities: initialData?.amenities || [],
    propertyType: initialData?.propertyType || 'apartment',
    squareFeet: initialData?.squareFeet || '',
    yearBuilt: initialData?.yearBuilt || '',
    petsAllowed: initialData?.petsAllowed || false,
    smokingAllowed: initialData?.smokingAllowed || false,
    checkInTime: initialData?.checkInTime || '15:00',
    checkOutTime: initialData?.checkOutTime || '11:00',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/properties/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to save property');
      }

      setFormData({
        title: '',
        description: '',
        location: '',
        pricePerNight: '',
        images: [],
      });
      onPropertyAdded();
    } catch (error) {
      console.error('Submit error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await res.json();
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, data.url]
      }));
    } catch (error) {
      setError('Failed to upload image: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const amenityOptions = [
    { id: 'wifi', label: 'WiFi', icon: <FaWifi /> },
    { id: 'parking', label: 'Parking', icon: <FaParking /> },
    { id: 'pool', label: 'Pool', icon: <FaSwimmingPool /> },
    { id: 'gym', label: 'Gym', icon: <FaDumbbell /> },
    { id: 'ac', label: 'Air Conditioning', icon: <FaSnowflake /> },
    { id: 'tv', label: 'TV', icon: <FaTv /> },
    { id: 'kitchen', label: 'Kitchen', icon: <FaUtensils /> },
    { id: 'waterfront', label: 'Waterfront', icon: <FaWater /> },
  ];

  const propertyTypes = [
    'apartment', 'house', 'condo', 'villa', 'cabin', 'cottage', 
    'townhouse', 'loft', 'studio', 'hotel', 'resort', 'other'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}
      
      <h2 className="text-2xl font-bold text-gray-900">
        {initialData ? 'Edit Property' : 'Add New Property'}
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            rows="4"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Price per night ($)</label>
          <input
            type="number"
            value={formData.pricePerNight}
            onChange={(e) => setFormData(prev => ({ ...prev, pricePerNight: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            required
            min="0"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-900">Images</label>
          <div className="flex items-center justify-center w-full">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:border-orange-500 transition-colors">
              <FaUpload className="w-8 h-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">Click to upload images</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Image Preview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {formData.images.map((url, index) => (
            <div key={url} className="relative group">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                <Image
                  src={url}
                  alt={`Property image ${index + 1}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    images: prev.images.filter(img => img !== url),
                  }));
                }}
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full shadow-lg"
              >
                <FaTimes className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <FaSpinner className="animate-spin mr-2" />
            {initialData ? 'Updating...' : 'Adding...'}
          </>
        ) : (
          initialData ? 'Update Property' : 'Add Property'
        )}
      </Button>
    </form>
  );
}