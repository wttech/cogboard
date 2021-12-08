import { COLORS } from '../../../../constants';

const logLevels = [
  { value: 'debug', color: COLORS.WHITE, level: 0 },
  { value: 'info', color: COLORS.WHITE, level: 1 },
  { value: 'warning', color: COLORS.YELLOW, level: 2 },
  { value: 'error', color: COLORS.RED, level: 3 },
  { value: 'success', color: COLORS.GREEN, level: 4 }
];

export default logLevels;
