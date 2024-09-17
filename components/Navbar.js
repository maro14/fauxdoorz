import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Component has mounted
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        setUser(true);
      }
    }
  }, []);

  const logout = useCallback(() => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      setUser(null);
      router.push('/');
    }
  }, [router]);

  // Prevent rendering until the component has mounted on the client
  if (!isMounted) {
    return null;
  }

  return (
    <nav className="h-full w-full bg-amber-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-80 border-none shadow-lg">
      <div className="container h-full w-full bg-amber-500 mx-auto flex justify-between items-center p-7">
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
                  aria-label="Logout"
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
                  <span className="text-white bg-green-700 hover:bg-green-600 cursor-pointer px-4 py-2 rounded">Sign In</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
