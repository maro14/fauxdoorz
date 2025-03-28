import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import '../styles/globals.css';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
})

// Auth protection wrapper
function AuthWrapper({ children, requireAuth }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <LoadingSpinner size="lg" color="orange" />
        <p className="text-lg font-medium text-gray-700 mt-6">Setting up your session...</p>
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
      <div className={`${inter.variable} ${plusJakarta.variable} font-sans`}>
        <AuthWrapper requireAuth={requireAuth}>
          {!isAuthPage && <Navbar />}
          <Component {...pageProps} />
          {!isAuthPage && <Footer />}
        </AuthWrapper>
      </div>
    </SessionProvider>
  );
}

export default MyApp;