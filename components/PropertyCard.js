import Image from 'next/image';
import Link from 'next/link';

export default function PropertyCard({ property }) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <Image
        src={property.images[0] || '/placeholder.jpg'}
        alt={property.title}
        width={500} // Specify a width
        height={192} // Specify a height
        className="w-full h-48 object-cover rounded-lg"
      />
      <h2 className="text-xl font-bold mt-4">{property.title}</h2>
      <p className="text-gray-600">{property.location}</p>
      <p className="text-lg font-bold">${property.price} per night</p>
      <Link href={`/properties/${property._id}`} className="text-green-500 mt-4 block">
        View Details
      </Link>
    </div>
  );
}