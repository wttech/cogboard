import { COLORS } from '../../../../constants';

const logLevels = {
  debug: { level: 10, color: COLORS.WHITE },
  info: { level: 20, color: COLORS.WHITE },
  warning: { level: 30, color: COLORS.YELLOW },
  error: { level: 40, color: COLORS.RED }
};

export default logLevels;
