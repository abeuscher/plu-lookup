// components/ThemeWrapper.tsx

'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#035c06',
    },
    secondary: {
      main: '#0070f3',
    },
    error: {
      main: '#f44336',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: 'linear-gradient(120deg, #595555, #1d0555, #351e18)',
      paper: 'rgba(255, 255, 255, 0.9)',
    },
    text: {
      primary: '#000',
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      marginBottom: '1.5rem',
      color: '#035c06',
      textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
    },
    h2: {
      marginBottom: '1.5rem',
      color: '#035c06',
      textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
    },
    h3: {
      marginBottom: '1.5rem',
      color: '#035c06',
      textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          lineHeight: 1.8,
          minHeight: '100vh',
        },
        a: {
          color: '#ffcc00',
          textDecoration: 'none',
          fontWeight: 'bold',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
        main: {
          padding: '0 0 2rem',
          minHeight: '50vh',
        },
        footer: {
          padding: '1.5rem 0',
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          color: '#000',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
  },
});

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
