import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import SemiCircleProgress from '../../../SemiProgressBar';
import { StyledTypography } from './styled';

const zabbixMetricsWithProgress = [ // temporary solution - we need metrics names
  'system.cpu.util[,idle]',
  'vm.memory.size[available]',
  'system.swap.size[,used]',
  'jmx[\\"java.lang:type=Memory\\",\\"HeapMemoryUsage.used\\"]',
  'vfs.fs.size[/,used]',
];

const progressBarWidth = {
  column1: {
    diameter: 150
  },
  column2: {
    diameter: 200
  },
  other: {
    diameter: 250
  }
};

const ZabbixWidget = ({ id, lastValue }) => {
  const widgetData = useSelector(
    ({ widgets }) => widgets.widgetsById[id],
    shallowEqual
  );
  const widgetConfig = widgetData.config;
  const widgetZabbixMetric = widgetData.selectedZabbixMetric;

  const checkMetricHasProgress = () => zabbixMetricsWithProgress.includes(widgetZabbixMetric);

  const setProgressSize = () => {
    const widgetColumns = widgetConfig.columns;
    return progressBarWidth[`column${widgetColumns}`]
      ? progressBarWidth[`column${widgetColumns}`].diameter
      : progressBarWidth.other.diameter;
  };

  return (
    <>
      <StyledTypography>ZabbixWidget</StyledTypography>
      {
        checkMetricHasProgress() ? (
          <SemiCircleProgress diameter={setProgressSize()} percentage={33} showPercentValue />
        ) : (
          <p>No progress</p> // TBD
        )
      }
    </>
  );
};

export default ZabbixWidget;
