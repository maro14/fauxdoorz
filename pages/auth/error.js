import Link from 'next/link';

export default function AuthError({ error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Authentication Error</h1>
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-red-700">{error}</p>
          </div>
          <Link href="/auth/login">
            <a className="mt-4 text-green-600 hover:text-green-500">
              Go Back to Login
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      error: context.query.error || 'An unexpected error occurred',
    },
  };
}