import type { AppProps } from 'next/app';

import '../styles/globals.css';
import Head from 'next/head';

import Navbar from '../components/Navbar';

import { ThemeProvider } from 'next-themes';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class">
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
