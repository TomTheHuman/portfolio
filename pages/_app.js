import React from 'react';

// External Imports
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Internal Imports
import '../styles/globals.css';
import theme from '../styles/MuiTheme';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
