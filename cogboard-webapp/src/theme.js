import { createMuiTheme } from '@material-ui/core/styles';
import { amber, blue, green, red } from '@material-ui/core/colors/index';

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#198cbd'
    },
    secondary: {
      main: '#1c2630'
    },
    background: {
      default: '#fffafa',
      paper: '#1c2630',
      board: {
        card: '#198cbd',
        dragged: '#bbdefb'
      }
    },
    status: {
      UNKNOWN: '#26243e',
      OK: '#019430',
      IN_PROGRESS: '#198cbd',
      UNSTABLE: '#ff5219',
      ERROR_CONNECTION: '#e1312f',
      ERROR_CONFIGURATION: '#e1312f',
      ERROR: '#e1312f',
      FAIL: '#e1312f'
    },
    snackbarVariant: {
      info: blue[100],
      success: green[300],
      warning: amber[700],
      error: red[800]
    }
  },
  shape: {
    borderRadius: 0
  },
  typography: {
    h3: {
      fontWeight: 500,
      letterSpacing: 2
    }
  }
});
