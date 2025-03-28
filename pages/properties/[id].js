// pages/properties/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaDollarSign, FaCalendarCheck, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
          <p className="text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-red-500">
        <p className="text-xl">Error: {error}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-gray-700">
        <p className="text-xl">No property found.</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Explore Properties
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10 max-w-7xl">
      {/* Back button */}
      <button 
        onClick={() => router.back()} 
        className="flex items-center text-gray-600 hover:text-blue-600 transition mb-6 group"
      >
        <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to listings
      </button>

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
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Vacation Home
            </span>
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
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-medium text-gray-900">Check-in</h3>
                <p className="text-gray-600">After 3:00 PM</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-medium text-gray-900">Check-out</h3>
                <p className="text-gray-600">Before 11:00 AM</p>
              </div>
            </div>
          </div>

          {/* Booking Button - enhanced */}
          <button className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl text-lg font-semibold flex items-center justify-center hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
            <FaCalendarCheck className="mr-3" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}