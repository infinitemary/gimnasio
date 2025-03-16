import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { AuthProvider } from '../features/auth/providers/auth-provider';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AuthProvider>
      {getLayout(<Component {...pageProps} />)}
    </AuthProvider>
  );
}

export default MyApp; 