import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const logout = useCallback(() => {
    if (window.confirm('Are you sure you want to log out?')) {
      signOut({ redirect: false }).then(() => {
        localStorage.removeItem('token');
        router.push('/');
      });
    }
  }, [router]);

  return (
    <nav className="h-full w-full bg-amber-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-80 border-none shadow-lg">
      <div className="container h-full w-full bg-amber-500 mx-auto flex justify-between items-center p-7">
        {/* Logo */}
        <Link href="/" passHref>
          <div className="flex items-center cursor-pointer">
            <Image src="/house logo.png" alt="Logo" width={50} height={50} />
          </div>
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
                  <span className="text-white bg-green-700 hover:bg-green-600 cursor-pointer px-4 py-2 rounded">
                    Sign Up
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
