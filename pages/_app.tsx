import react, { useState } from 'react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';

import Head from 'next/head';
import Navbar from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import { ThemeProvider } from 'next-themes';

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <>
      <Head>
        <title>Movieban</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <ThemeProvider attribute="class">
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </SessionContextProvider>
    </>
  );
}
