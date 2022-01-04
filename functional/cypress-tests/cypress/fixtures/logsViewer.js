import appLogLevels from '../../../../cogboard-webapp/src/components/widgets/types/LogViewerWidget/logLevels';

export const filters = {
  startsWithA: {
    label: 'starts with a',
    regExp: '^a',
  },
  amet: {
    label: 'amet',
    regExp: 'amet',
  },
};

export const logLevels = Object.keys(appLogLevels).map((key) => ({
  level: appLogLevels[key].level,
  value: key,
}));
