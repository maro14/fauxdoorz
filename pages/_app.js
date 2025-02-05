import { SessionProvider } from "next-auth/react";
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  
  // Don't show Navbar and Footer on auth pages
  const isAuthPage = router.pathname.startsWith('/auth/');

  return (
    <SessionProvider session={session}>
      {!isAuthPage && <Navbar />}
      <Component {...pageProps} />
      {!isAuthPage && <Footer />}
    </SessionProvider>
  );
}

export default MyApp;
