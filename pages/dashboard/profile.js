import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ProfileSettings from '@/components/dashboard/ProfileSettings';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === 'authenticated') {
        try {
          const response = await fetch('/api/users/me');
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setUserData(data);
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [status]);

  if (status === 'loading' || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" color="orange" />
        <p className="mt-4 text-gray-600">Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>Error: {error}</p>
          <p>Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Profile</h1>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <ProfileSettings userData={userData} />
        </div>
      </div>
    </div>
  );
}

// This ensures the page requires authentication
export function getServerSideProps() {
  return {
    props: {
      requireAuth: true,
    },
  };
}