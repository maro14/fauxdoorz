// pages/properties/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaDollarSign, FaCalendarCheck, FaArrowLeft, FaArrowRight, 
  FaBed, FaBath, FaUser, FaWifi, FaParking, FaSwimmingPool, FaDumbbell, 
  FaSnowflake, FaTv, FaUtensils, FaWater, FaPaw, FaSmoking, FaCalendarAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import PropertyDetailSkeleton from '@/components/PropertyDetailSkeleton';

export default function PropertyDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    async function fetchProperty() {
      try {
        const res = await fetch(`/api/properties/${id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Failed to load property details');
        }
        setProperty(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [id]);

  // Image slider navigation functions
  const nextImage = () => {
    if (!property?.images?.length) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (!property?.images?.length) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <PropertyDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md border border-gray-100 text-center">
          <div className="text-red-500 text-5xl mb-6">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Error Loading Property</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <Button
            onClick={() => router.push('/properties')}
            className="w-full"
          >
            Browse Other Properties
          </Button>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md border border-gray-100 text-center">
          <div className="text-orange-500 text-5xl mb-6">🏠</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Property Not Found</h2>
          <p className="text-gray-600 mb-8">The property you're looking for doesn't exist or has been removed.</p>
          <Button
            onClick={() => router.push('/properties')}
            className="w-full"
          >
            Explore Properties
          </Button>
        </div>
      </div>
    );
  }

  // Helper function to render amenity icons
  const renderAmenityIcon = (amenity) => {
    switch(amenity) {
      case 'wifi': return <FaWifi />;
      case 'parking': return <FaParking />;
      case 'pool': return <FaSwimmingPool />;
      case 'gym': return <FaDumbbell />;
      case 'ac': return <FaSnowflake />;
      case 'tv': return <FaTv />;
      case 'kitchen': return <FaUtensils />;
      case 'waterfront': return <FaWater />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-7xl">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="flex items-center gap-2 group mb-6"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to listings
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-10">
        {/* Property Image Gallery - with enhanced styling */}
        <div className="space-y-4">
          {property.images && property.images.length > 0 ? (
            <div className="relative">
              <div className="relative h-[500px] w-full overflow-hidden rounded-2xl">
                <Image
                  src={property.images[currentImageIndex]}
                  alt={`${property.title} - Image ${currentImageIndex + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover rounded-2xl shadow-lg transition-all duration-500 ease-in-out"
                  priority
                />
              </div>
              
              {/* Navigation arrows - enhanced */}
              {property.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                    aria-label="Previous image"
                  >
                    <FaArrowLeft className="text-gray-800" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                    aria-label="Next image"
                  >
                    <FaArrowRight className="text-gray-800" />
                  </button>
                </>
              )}
              
              {/* Image counter - enhanced */}
              <div className="absolute bottom-6 right-6 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>
              
              {/* Thumbnail navigation - enhanced */}
              <div className="flex mt-6 space-x-3 overflow-x-auto pb-2 px-1">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                      currentImageIndex === index 
                        ? 'ring-3 ring-blue-500 scale-105' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-[500px] bg-gray-100 rounded-2xl flex items-center justify-center">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
        </div>

        {/* Property Details - enhanced */}
        <div className="flex flex-col justify-between bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div>
            {property.propertyType && (
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4 capitalize">
                {property.propertyType}
              </span>
            )}
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{property.title}</h1>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">{property.description}</p>
            
            <div className="flex flex-col space-y-4 mb-8">
              <div className="flex items-center text-green-600 text-2xl font-bold">
                <FaDollarSign className="mr-2" />
                <span className="mr-2">{property.pricePerNight?.toLocaleString()}</span>
                <span className="text-base font-normal text-gray-600">/ night</span>
              </div>
              
              <div className="flex items-center text-gray-700">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                <p className="text-lg">{property.location}</p>
              </div>
            </div>
            
            {/* Property Features */}
            <div className="grid grid-cols-3 gap-4 mb-8 border-t border-b border-gray-100 py-6">
              {property.bedrooms && (
                <div className="flex flex-col items-center text-center p-3">
                  <FaBed className="text-2xl text-gray-500 mb-2" />
                  <span className="font-medium">{property.bedrooms}</span>
                  <span className="text-sm text-gray-500">{property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                </div>
              )}
              
              {property.bathrooms && (
                <div className="flex flex-col items-center text-center p-3">
                  <FaBath className="text-2xl text-gray-500 mb-2" />
                  <span className="font-medium">{property.bathrooms}</span>
                  <span className="text-sm text-gray-500">{property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
                </div>
              )}
              
              {property.maxGuests && (
                <div className="flex flex-col items-center text-center p-3">
                  <FaUser className="text-2xl text-gray-500 mb-2" />
                  <span className="font-medium">{property.maxGuests}</span>
                  <span className="text-sm text-gray-500">{property.maxGuests === 1 ? 'Guest' : 'Guests'}</span>
                </div>
              )}
            </div>
            
            {/* Check-in/Check-out Times */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-500" />
                  Check-in
                </h3>
                <p className="text-gray-600">{property.checkInTime || 'After 3:00 PM'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-500" />
                  Check-out
                </h3>
                <p className="text-gray-600">{property.checkOutTime || 'Before 11:00 AM'}</p>
              </div>
            </div>
            
            {/* Property Policies */}
            {(property.petsAllowed !== undefined || property.smokingAllowed !== undefined) && (
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-3">House Rules</h3>
                <div className="flex flex-wrap gap-4">
                  {property.petsAllowed !== undefined && (
                    <div className={`flex items-center gap-2 ${property.petsAllowed ? 'text-green-600' : 'text-red-500'}`}>
                      <FaPaw />
                      <span>{property.petsAllowed ? 'Pets allowed' : 'No pets'}</span>
                    </div>
                  )}
                  {property.smokingAllowed !== undefined && (
                    <div className={`flex items-center gap-2 ${property.smokingAllowed ? 'text-green-600' : 'text-red-500'}`}>
                      <FaSmoking />
                      <span>{property.smokingAllowed ? 'Smoking allowed' : 'No smoking'}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-4">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-gray-700">
                      {renderAmenityIcon(amenity)}
                      <span className="capitalize">{amenity.replace('-', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Additional Property Details */}
            {(property.squareFeet || property.yearBuilt) && (
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-3">Property Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  {property.squareFeet && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="font-medium">Size:</span>
                      <span>{property.squareFeet} sq ft</span>
                    </div>
                  )}
                  {property.yearBuilt && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="font-medium">Year built:</span>
                      <span>{property.yearBuilt}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Booking Button - enhanced */}
          <Button
            size="lg"
            fullWidth
            className="mt-6 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <FaCalendarCheck className="mr-3" />
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
