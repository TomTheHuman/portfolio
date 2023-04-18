import { createTheme } from '@mui/material';

/**
 * Exports Mui theme configuration to be used application-wide
 */
const theme = createTheme({
  typography: {
    fontFamily: 'DM Sans, sans-serif',
    h1: {
      fontWeight: 1000,
      fontFamily: 'Poppins, sans-serif',
    },
    button: {
      fontFamily: 'DM Sans, sans-serif',
    },
  },
  palette: {
    primary: {
      main: '#284B63',
    },
    secondary: {
      main: '#3C6E71',
    },
    background: {
      default: '#FFFFFF',
    },
    text: {
      secondary: '#353535',
      disabled: 'rgba(76,76,76,0.69)',
      primary: '#000000',
    },
    error: {
      main: '#D7263D',
    },
    warning: {
      main: '#F46036',
    },
    success: {
      main: '#1B998B',
    },
    info: {
      main: '#2E294E',
    },
    divider: '#D9D9D9',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          color: 'black',
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

export default theme;
