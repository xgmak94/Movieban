import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="flex flex-row justify-between gap-3 text-black dark:text-white bg-slate-200 dark:bg-slate-900">
      <Image
        className="w-auto h-5 object-contain self-center"
        src="/TMDB.svg"
        width="100"
        height="100"
        alt="TMDB logo"
      />
      This product uses the TMDB API but is not endorsed or certified by TMDB.
    </footer>
  );
}
