import type { AppProps } from 'next/app';

import '../styles/globals.css';

import Navbar from '../components/Nav/Nav';

import { ThemeProvider } from 'next-themes';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Movieban</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class">
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
