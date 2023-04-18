import React from 'react';

// External Imports
import Head from 'next/head';

// Internal Imports
import App from '../components/App';
import sx from '../styles/components/Home.module.css';

/**
 * App root component, configuring page base and rendering App
 * @returns {JSX.Element} root component
 */
export default function Home() {
  return (
    <div className={sx.container}>
      <Head>
        <title>Brown Bear Epoxy</title>
        <meta name="description" content="Brown Bear Epoxy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </div>
  );
}
