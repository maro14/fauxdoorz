// pages/properties/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaDollarSign, FaCalendarCheck, FaArrowLeft, FaArrowRight, 
  FaBed, FaBath, FaUser, FaWifi, FaParking, FaSwimmingPool, FaDumbbell, 
  FaSnowflake, FaTv, FaUtensils, FaWater, FaPaw, FaSmoking, FaCalendarAlt, FaExpand } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import PropertyDetailSkeleton from '@/components/PropertyDetailSkeleton';

export default function PropertyDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const bookingRef = useRef(null);

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

  // Function to toggle lightbox
  const toggleLightbox = () => {
    setShowLightbox(!showLightbox);
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
      {/* Back button - remains the same */}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-10">
        {/* Property Image Gallery - now spans 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          {property.images && property.images.length > 0 ? (
            <div className="relative">
              <div 
                className="relative h-[500px] w-full overflow-hidden rounded-2xl cursor-pointer group"
                onClick={toggleLightbox}
              >
                <Image
                  src={property.images[currentImageIndex]}
                  alt={`${property.title} - Image ${currentImageIndex + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover rounded-2xl shadow-lg transition-all duration-500 ease-in-out group-hover:scale-105"
                  priority
                />
                
                {/* Expand icon overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/80 p-3 rounded-full">
                    <FaExpand className="text-gray-800" />
                  </div>
                </div>
              </div>
              
              {/* Navigation arrows - remain the same */}
              
              {/* Image counter - remains the same */}
              
              {/* Thumbnail navigation - enhanced with hover effects */}
              <div className="flex mt-6 space-x-3 overflow-x-auto pb-2 px-1 scrollbar-thin scrollbar-thumb-gray-300">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                      currentImageIndex === index 
                        ? 'ring-2 ring-orange-500 scale-105' 
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
          
          {/* Property description section - moved from the sidebar */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-8">
            {property.propertyType && (
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4 capitalize">
                {property.propertyType}
              </span>
            )}
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{property.title}</h1>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">{property.description}</p>
            
            <div className="flex items-center text-gray-700 mb-6">
              <FaMapMarkerAlt className="mr-2 text-red-500" />
              <p className="text-lg">{property.location}</p>
            </div>
            
            {/* Property Features - remain the same */}
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-gray-700 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      {renderAmenityIcon(amenity)}
                      <span className="capitalize">{amenity.replace('-', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Other sections remain the same */}
          </div>
          
          {/* Map section - new addition */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-8">
            <h3 className="font-semibold text-lg mb-3">Location</h3>
            <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Map will be displayed here</p>
              {/* You can integrate Google Maps or another map provider here */}
            </div>
          </div>
        </div>

        {/* Booking sidebar - now sticky */}
        <div className="lg:col-span-1" ref={bookingRef}>
          <div className="sticky top-24 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center text-green-600 text-2xl font-bold">
                <FaDollarSign className="mr-1" />
                <span>{property.pricePerNight?.toLocaleString()}</span>
              </div>
              <span className="text-base font-normal text-gray-600">/ night</span>
            </div>
            
            {/* Date picker placeholder */}
            <div className="border border-gray-200 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Check-in</label>
                  <div className="flex items-center border border-gray-300 rounded-lg p-2">
                    <FaCalendarAlt className="text-gray-400 mr-2" />
                    <span className="text-gray-500">Select date</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Check-out</label>
                  <div className="flex items-center border border-gray-300 rounded-lg p-2">
                    <FaCalendarAlt className="text-gray-400 mr-2" />
                    <span className="text-gray-500">Select date</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Guest selector placeholder */}
            <div className="border border-gray-200 rounded-xl p-4 mb-6">
              <label className="block text-sm text-gray-600 mb-1">Guests</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2">
                <FaUser className="text-gray-400 mr-2" />
                <span className="text-gray-500">1 guest</span>
              </div>
            </div>
            
            {/* Price breakdown */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">${property.pricePerNight?.toLocaleString()} x 1 night</span>
                <span className="text-gray-700">${property.pricePerNight?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Cleaning fee</span>
                <span className="text-gray-700">$50</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Service fee</span>
                <span className="text-gray-700">$30</span>
              </div>
              <div className="flex justify-between font-bold mt-4 pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>${(property.pricePerNight + 80)?.toLocaleString()}</span>
              </div>
            </div>
            
            {/* Booking Button - enhanced */}
            <Button
              size="lg"
              fullWidth
              className="shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <FaCalendarCheck className="mr-3" />
              Reserve Now
            </Button>
            
            {/* No charge yet message */}
            <p className="text-center text-sm text-gray-500 mt-4">
              You won't be charged yet
            </p>
          </div>
        </div>
      </div>
      
      {/* Lightbox modal */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={toggleLightbox}>
          <div className="relative max-w-7xl max-h-screen p-4">
            <button 
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                toggleLightbox();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative">
              <Image
                src={property.images[currentImageIndex]}
                alt={`${property.title} - Image ${currentImageIndex + 1}`}
                width={1800}
                height={1200}
                className="max-h-[85vh] w-auto mx-auto object-contain"
              />
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full"
              >
                <FaArrowLeft className="text-white" />
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full"
              >
                <FaArrowRight className="text-white" />
              </button>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
