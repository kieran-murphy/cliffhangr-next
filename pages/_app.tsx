import React from 'react';
import '../src/app/globals.css';
import { SessionProvider } from 'next-auth/react';
import PagesLayout from '../components/PagesLayout';
import { Toaster } from 'react-hot-toast';

import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps): React.JSX.Element => {
  return (
    <SessionProvider session={pageProps.session}>
      <PagesLayout>
        <Component {...pageProps} />
        <Toaster position="bottom-center" />
      </PagesLayout>
    </SessionProvider>
  );
};

export default MyApp;
