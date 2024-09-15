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
      <div className="container mx-auto flex justify-between items-center p-7">
        {/* Logo */}
        <Link href="/" passHref>
          <span className="text-2xl font-bold text-black cursor-pointer">Greendoorz</span>
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
                <Link href="/api/auth/login" passHref>
                  <span className="text-black hover:text-green-500 cursor-pointer">Login</span>
                </Link>
              </li>
              <li>
                <Link href="/api/auth/signup" passHref>
                  <span className="text-black hover:text-green-500 cursor-pointer">Signup</span>
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden">
          <button className="text-black focus:outline-none" aria-label="Toggle menu">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}