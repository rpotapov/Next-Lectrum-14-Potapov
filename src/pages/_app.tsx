import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wrapper } from '../store';
import '../styles/globals.css';
import '../i18n/config';
import { useState } from 'react';
import NavBar from '@/components/NavBar';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <LanguageSwitcher />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default wrapper.withRedux(MyApp);