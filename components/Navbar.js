import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        setUser(true);
      }
    }
  }, []);

  const logout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      setUser(null);
      router.push('/');
    }
  };

  return (
    <nav className="h-full w-full bg-yellow-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-80 border">
      <div className="container mx-auto flex justify-between items-center p-10">
        {/* Logo */}
        <Link href="/" passHref>
          <span className="text-2xl font-bold text-black cursor-pointer">Fauxdoorz</span>
        </Link>

        {/* Links and User Actions */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link href="/properties" passHref>
              <span className="text-black hover:text-green-500 cursor-pointer">Properties</span>
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link href="/dashboard" passHref>
                  <span className="text-black hover:text-green-500 cursor-pointer">Dashboard</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-red-500 transition-colors duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" passHref>
                  <span className="text-black hover:text-green-500 cursor-pointer">Login</span>
                </Link>
              </li>
              <li>
                <Link href="/signup" passHref>
                <span className="text-white bg-green-700 hover:bg-green-600 cursor-pointer px-4 py-2 rounded">Sign In </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}