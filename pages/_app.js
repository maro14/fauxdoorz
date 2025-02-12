import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';

// Auth protection wrapper
function AuthWrapper({ children, requireAuth }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
          <p className="text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !session) {
    router.push('/auth/signin');
    return null;
  }

  return children;
}

function MyApp({ Component, pageProps: { session, requireAuth, ...pageProps } }) {
  const router = useRouter();
  const isAuthPage = router.pathname.startsWith('/auth/');
  return (
    <SessionProvider session={session}>
      <AuthWrapper requireAuth={requireAuth}>
        {!isAuthPage && <Navbar />}
        <Component {...pageProps} />
        {!isAuthPage && <Footer />}
      </AuthWrapper>
    </SessionProvider>
  );
}

export default MyApp;