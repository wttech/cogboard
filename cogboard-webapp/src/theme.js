import { createMuiTheme } from '@material-ui/core/styles';

const gradientAngle = 45;

const createGradient = (start, end) => `linear-gradient(${gradientAngle}deg, ${start}, ${end})`;

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#211F39',
      paper: '#26243E'
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