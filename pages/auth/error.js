import Link from 'next/link';

export default function AuthError({ error }) {
  const errorMessages = {
    Configuration: 'There is a problem with the server configuration.',
    AccessDenied: 'You do not have permission to access this resource.',
    Verification: 'The verification link may have expired or already been used.',
    Default: 'An unexpected authentication error occurred.',
  };

  const message = errorMessages[error] || errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <div className="mt-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{message}</p>
          </div>
          <div className="mt-4 space-y-4 text-center">
            <Link href="/auth/signin" className="text-blue-600 hover:text-blue-500 block">
              Return to sign in
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-500 block">
              Return to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      error: context.query.error || 'Default',
    },
  };
} 