import { Box } from '@mui/material';
import React from 'react';

// Internal Imports
import sx from '../styles/components/Landing.module.scss';

/**
 * Contact page component, rendering content to be displayed when users
 * first visit the site
 * @returns {JSX.Element} landing page component
 */
export default function Contact(): JSX.Element {
  return (
    <Box className={sx.container}>
      <Box className={sx.content}>
        <h1 className={sx.head1}>Contact</h1>
      </Box>
    </Box>
  );
}
