import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import PropertyForm from '@/components/dashboard/PropertyForm';
import PropertyList from '@/components/dashboard/PropertyList';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchUserProperties();
    }
  }, [session]);

  const fetchUserProperties = async () => {
    try {
      const res = await fetch('/api/properties/user');
      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Property Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Form */}
        <div className="lg:col-span-1">
          <PropertyForm onPropertyAdded={fetchUserProperties} />
        </div>

        {/* Property List */}
        <div className="lg:col-span-2">
          <PropertyList 
            properties={properties} 
            onPropertyUpdated={fetchUserProperties}
            onPropertyDeleted={fetchUserProperties}
          />
        </div>
      </div>
    </div>
  );
} 