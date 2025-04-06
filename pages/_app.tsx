import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../lib/theme';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
        <ToastContainer position="top-right" autoClose={3000} />
      </Layout>
    </ThemeProvider>
  );
}

// Ensure we wrap the app with the i18n provider
export default appWithTranslation(MyApp);
