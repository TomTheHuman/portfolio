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
      main: '#ffffff',
      light: '#284B63',
      dark: '#1D3557',
      contrastText: '#000000',
    },
    secondary: {
      main: '#ffcc48',
      contrastText: '#273140',
    },
    background: {
      default: '#273140',
      paper: '#3c4553',
    },
    text: {
      secondary: '#d0d0d0',
      disabled: '#aaaaaa',
      primary: '#ffffff',
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
      main: '#e63946',
    },
    divider: '#ffcc48',
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
