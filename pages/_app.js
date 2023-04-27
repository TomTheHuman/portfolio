import React from 'react';

// External Imports
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';

// Internal Imports
import '../styles/globals.css';
import { site } from '../utils/Info';
import theme from '../styles/MuiTheme';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>{site.config.title}</title>
        <meta name="theme-color" content="#273140" />
        <meta name="description" content={site.config.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
