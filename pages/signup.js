import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Client-side validation
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true); // Set loading state

    try {
      // Step 1: Sign up the user
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log('Signup API response:', data);

      if (res.ok) {
        // Step 2: Automatically log the user in after successful sign-up
        const loginResult = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });
        console.log('Login result:', loginResult);

        if (loginResult.ok) {
          router.push('/'); // Step 3: Redirect to the home page after successful login
        } else {
          setError('Error logging in after sign-up');
        }
      } else {
        setError(data.message || 'An error occurred during signup');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false); // Remove loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
