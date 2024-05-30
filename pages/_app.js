import React from 'react';

// External Imports
import Head from 'next/head';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { RecoilRoot } from 'recoil';

// Internal Imports
import '../styles/globals.css';
import Layout from '../components/Layout/Layout';
import Background from '../components/Background/Background';

function MyApp({ Component, pageProps }) {
  return (
    <FluentProvider theme={webLightTheme}>
      <Head>
        <title>Thomas Shaw</title>
        {/* <meta name="theme-color" content="#273140" /> */}
        <meta name="description" content="Web Development Portfolio of Thomas Shaw" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecoilRoot>
        <Background />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </FluentProvider>
  );
}

export default MyApp;
