import { useState } from 'react';
import Image from 'next/image';
import { FaEdit, FaTrash, FaBed, FaBath, FaUser, FaEye } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function PropertyList({ properties, onPropertyUpdated, onPropertyDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (propertyId) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    setIsDeleting(true);
    setDeletingId(propertyId);
    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete property');
      
      onPropertyDeleted();
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property');
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Properties</h2>
        <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {properties.length} {properties.length === 1 ? 'Property' : 'Properties'}
        </span>
      </div>
      
      {properties.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">You haven&apos;t added any properties yet.</p>
          <p className="text-sm text-gray-400">Create your first property listing using the form above.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {properties.map((property) => (
            <div 
              key={property._id} 
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Property Image */}
                <div className="w-full sm:w-32 h-24 relative flex-shrink-0">
                  <Image
                    src={property.images?.[0] || '/images/placeholder.jpg'}
                    alt={property.title}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>

                {/* Property Details */}
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-gray-900">{property.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{property.location}</p>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 mb-2">
                    {property.bedrooms && (
                      <span className="flex items-center gap-1">
                        <FaBed className="text-gray-400" />
                        {property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}
                      </span>
                    )}
                    {property.bathrooms && (
                      <span className="flex items-center gap-1">
                        <FaBath className="text-gray-400" />
                        {property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}
                      </span>
                    )}
                    {property.maxGuests && (
                      <span className="flex items-center gap-1">
                        <FaUser className="text-gray-400" />
                        {property.maxGuests} {property.maxGuests === 1 ? 'guest' : 'guests'}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-orange-600 font-semibold">
                    ${typeof property.pricePerNight === 'number' ? 
                      property.pricePerNight.toLocaleString() : 
                      property.pricePerNight}/night
                  </p>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col justify-end gap-2">
                  <Link href={`/properties/${property._id}`} passHref>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <FaEye className="mr-1" /> View
                    </Button>
                  </Link>
                  
                  <Button
                    onClick={() => onPropertyUpdated(property)}
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </Button>
                  
                  <Button
                    onClick={() => handleDelete(property._id)}
                    disabled={isDeleting}
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    {isDeleting && deletingId === property._id ? (
                      <>
                        <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <FaTrash className="mr-1" /> Delete
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}