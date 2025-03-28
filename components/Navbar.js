import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut({ redirect: false });
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [router]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image 
                src="/faux.svg" 
                alt="Logo" 
                width={40} 
                height={40} 
                className="rounded-lg transition-transform group-hover:scale-105" 
              />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                fauxDoorz
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/properties"
              className="text-gray-600 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
            >
              Browse Properties
            </Link>

            {status === 'loading' ? (
              <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
            ) : session ? (
              <>
                <Link 
                  href="/dashboard"
                  className="text-gray-600 hover:text-orange-500 px-3 py-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                
                {/* User Menu */}
                <div className="relative flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">
                    {session.user.name || session.user.email}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t`}>
        <div className="px-4 py-3 space-y-2">
          <Link 
            href="/properties"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Browse Properties
          </Link>

          {session ? (
            <>
              <Link 
                href="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleSignOut();
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}