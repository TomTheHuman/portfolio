import { Box } from '@mui/material';
import React from 'react';

// Internal Imports
import info from '../utils/Info';
import sx from '../styles/components/Landing.module.scss';

/**
 * Landing page component, rendering content to be displayed when users
 * first visit the site
 * @returns {JSX.Element} landing page component
 */
export default function Landing(): JSX.Element {
  return (
    <Box className={sx.container}>
      <Box
        id={sx.landing}
        className={sx.content}
      >
        <h1 className={sx.head1}>{info.site.title}</h1>
        <h2 className={sx.head3}>{info.site.subtitle}</h2>
      </Box>
    </Box>
  );
}
