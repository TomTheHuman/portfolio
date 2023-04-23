import { Box } from '@mui/material';
import React from 'react';

// Internal Imports
import Head from 'next/head';
import { site } from '../utils/Info';
import sx from '../styles/components/Landing.module.scss';

/**
 * Landing page component, rendering content to be displayed when users
 * first visit the site
 * @returns {JSX.Element} landing page component
 */
export default function Landing(): JSX.Element {
  return (
    <Box className={sx.container}>
      <Head>
        <title>{site.config.title}</title>
        <meta name="description" content={site.config.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        id={sx.landing}
        className={sx.content}
      >
        <h1 className={sx.head1}>Title</h1>
        <h2 className={sx.head3}>Subtitle</h2>
      </Box>
    </Box>
  );
}
