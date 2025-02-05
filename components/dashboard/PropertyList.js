import { useState } from 'react';
import Image from 'next/image';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function PropertyList({ properties, onPropertyUpdated, onPropertyDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (propertyId) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    setIsDeleting(true);
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
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Your Properties</h2>
      
      {properties.length === 0 ? (
        <p className="text-gray-500">No properties added yet.</p>
      ) : (
        <div className="grid gap-6">
          {properties.map((property) => (
            <div key={property._id} className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
              {/* Property Image */}
              <div className="w-24 h-24 relative flex-shrink-0">
                <Image
                  src={property.images[0] || '/placeholder-image.jpg'}
                  alt={property.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>

              {/* Property Details */}
              <div className="flex-grow">
                <h3 className="font-bold">{property.title}</h3>
                <p className="text-sm text-gray-600">{property.location}</p>
                <p className="text-sm font-semibold">${property.price}/night</p>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => onPropertyUpdated(property)}
                  className="p-2 text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(property._id)}
                  disabled={isDeleting}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 