import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#1e40af',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Montserrat', system-ui, sans-serif",
    h1: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 900,
    },
    h2: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 800,
    },
    h3: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 700,
    },
    button: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '12px 32px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
  },
})

export default theme

