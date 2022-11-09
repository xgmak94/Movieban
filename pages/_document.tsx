import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { resetServerContext } from 'react-beautiful-dnd';

export default function _Document() {
  async function getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    resetServerContext();
    return { ...initialProps };
  }

  return (
    <Html lang="en">
      <Head />
      <body className="bg-white text-black dark:bg-black dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
