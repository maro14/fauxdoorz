import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useCallback, useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = useCallback(() => {
    if (window.confirm('Are you sure you want to log out?')) {
      signOut({ redirect: false }).then(() => {
        localStorage.removeItem('token');
        router.push('/');
      });
    }
  }, [router]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" passHref>
              <div className="flex items-center space-x-2">
                <Image src="/house logo.png" alt="Logo" width={40} height={40} className="rounded-lg" />
                <span className="text-xl font-bold text-gray-800">fauxDoorz</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/properties" passHref>
              <div className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Browse Properties
              </div>
            </Link>

            {user ? (
              <>
                <Link href="/dashboard" passHref>
                  <div className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Dashboard
                  </div>
                </Link>
                
                {/* User Menu */}
                <div className="relative ml-3">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">
                      {user.name || user.email}
                    </span>
                    <button
                      onClick={logout}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" passHref>
                  <div className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Login
                  </div>
                </Link>
                <Link href="/auth/signin" passHref>
                  <div className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    Sign In
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/properties" passHref>
            <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Browse Properties
            </div>
          </Link>

          {user ? (
            <>
              <Link href="/dashboard" passHref>
                <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  Dashboard
                </div>
              </Link>
              <button
                onClick={logout}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  Login
                </div>
              </Link>
              <Link href="/signin" passHref>
                <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  Sign In
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}