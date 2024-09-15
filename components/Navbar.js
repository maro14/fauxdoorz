import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Assuming you store the JWT token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setUser(true);  // Logic to decode the token can be added here
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between p-4">
        <Link href="/">
          <a className="text-2xl font-bold">Greendoorz</a>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/properties">
              <a className="text-gray-700 hover:text-green-500">Properties</a>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/dashboard">
                  <a className="text-gray-700 hover:text-green-500">Dashboard</a>
                </Link>
              </li>
              <li>
                <button onClick={logout} className="text-gray-700 hover:text-red-500">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">
                  <a className="text-gray-700 hover:text-green-500">Login</a>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <a className="text-gray-700 hover:text-green-500">Signup</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
