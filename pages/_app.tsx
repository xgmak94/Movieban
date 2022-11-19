import type { AppProps } from 'next/app';

import '../styles/globals.css';

import Navbar from '../components/Nav/Nav';

import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import Footer from '../components/Footer/Footer';

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { useState } from 'react';

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  return (
    <>
      <Head>
        <title>Movieban</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider attribute="class">
        <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </SessionContextProvider>
      </ThemeProvider>
    </>
  );
}
