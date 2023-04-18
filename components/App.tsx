import React from 'react';

// External Imports
import { Box, ThemeProvider } from '@mui/material';

// Internal Imports
import theme from 'styles/MuiTheme';
import sx from '../styles/components/App.module.scss';
import Header from './Header';
import Landing from './Landing';

/**
 * App component where core UI is configured
 * @returns {JSX.Element}
 */
export default function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Box className={sx.root}>
        <Header />
        <Landing />
      </Box>
    </ThemeProvider>

  );
}
