import { createMuiTheme } from '@material-ui/core/styles';
import { amber, blue, green, red } from '@material-ui/core/colors/index';

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#198CDB'
    },
    secondary: {
      main: '#1C2630'
    },
    background: {
      default: '#fff',
      paper: '#1C2630',
      board: {
        card: '#198CDB',
        dragged: '#bbdefb'
      }
    },
    status: {
      UNKNOWN: '#26243E',
      OK: '#019430',
      IN_PROGRESS: '#198CDB',
      UNSTABLE: '#FF5219',
      ERROR_CONNECTION: '#E1312F',
      ERROR_CONFIGURATION: '#E1312F',
      ERROR: '#E1312F',
      FAIL: '#E1312F'
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
