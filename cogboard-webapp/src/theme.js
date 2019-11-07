import { createMuiTheme } from '@material-ui/core/styles';
import { amber, blue, green, red } from "@material-ui/core/colors/index";

const gradientAngle = 45;

const createGradient = (start, end) => `linear-gradient(${gradientAngle}deg, ${start}, ${end})`;

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#211F39',
      paper: '#26243E',
      board: {
        card: '#5c6bc0',
        dragged: '#353b61'
      }
    },
    status: {
      UNKNOWN: '#26243E',
      OK: createGradient('#519657', '#81c784'),
      IN_PROGRESS: createGradient('#009faf', '#4dd0e1'),
      UNSTABLE: createGradient('#c75b39', '#ff8a65'),
      ERROR_CONNECTION: createGradient('#af4448', '#e57373'),
      ERROR_CONFIGURATION: createGradient('#af4448', '#e57373'),
      ERROR: createGradient('#af4448', '#e57373'),
      FAIL: createGradient('#af4448', '#e57373')
    },
    snackbarVariant : {
      info: blue[100],
      success: green[300],
      warning: amber[700],
      error: red[800]
    }
  },
  shape: {
    borderRadius: 10
  },
  typography: {
    h3: {
      fontWeight: 500,
      letterSpacing: 2
    }
  }
});