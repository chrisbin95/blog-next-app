import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Analytics } from '@vercel/analytics/react';

import '@/styles/tailwind.css';
import 'focus-visible';

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default function App({ Component, pageProps, router }) {
  // Track the previous pathname using the custom hook
  const previousPathname = usePrevious(router.pathname);

  return (
    <>
      {/* Placeholder for a loading spinner or other global components */}
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* Other head elements */}
      </Head>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      
      {/* Main content with Header, Component, and Footer */}
      <div className="relative">
        <Header />
        <main>
          {/* Pass the previousPathname as a prop to the main component */}
          <Component previousPathname={previousPathname} {...pageProps} />
        </main>
        <Footer />
      </div>

      {/* Analytics component */}
      <Analytics />
    </>
  );
}

