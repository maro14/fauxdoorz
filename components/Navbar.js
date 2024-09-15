// Navbar.js (updated)
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="h-full w-full bg-yellow-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-80 border">
      <div className="container mx-auto flex justify-between p-7">
        <Link href="/" className="text-2xl font-bold text-black">
          Greendoorz
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/properties" className="text-black hover:text-green-500">
              Properties
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/dashboard" className="text-black hover:text-green-500">
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={logout} className="text-gray-700 hover:text-red-500">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className="text-black hover:text-green-500">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-black hover:text-green-500">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
