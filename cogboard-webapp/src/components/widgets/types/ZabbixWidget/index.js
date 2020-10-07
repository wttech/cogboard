import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import SemiCircleProgress from '../../../SemiProgressBar';
import { StyledTypography } from './styled';

const zabbixMetrics = { // temporary solution - we need metrics names
  withProgress: [
    'system.cpu.util[,idle]',
    'vm.memory.size[available]',
    'system.swap.size[,used]',
    'jmx[\\"java.lang:type=Memory\\",\\"HeapMemoryUsage.used\\"]',
    'vfs.fs.size[/,used]'
  ],
  withoutMaxValue: [
    'system.cpu.util[,idle]'
  ]
};

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

const ZabbixWidget = ({ id, lastvalue }) => {
  const widgetData = useSelector(
    ({ widgets }) => widgets.widgetsById[id],
    shallowEqual
  );
  const widgetConfig = widgetData.config;
  const widgetZabbixMetric = widgetData.selectedZabbixMetric;
  const maxValue = widgetData.maxValue;

  const checkMetricHasProgress = () => zabbixMetrics.withProgress.includes(widgetZabbixMetric);
  const checkMetricHasMaxValue = () => zabbixMetrics.withoutMaxValue.includes(widgetZabbixMetric);

  const setProgressSize = () => {
    const widgetColumns = widgetConfig.columns;
    return progressBarWidth[`column${widgetColumns}`]
      ? progressBarWidth[`column${widgetColumns}`].diameter
      : progressBarWidth.other.diameter;
  };

  const calculatePercentageValue = () => {
    if (checkMetricHasMaxValue()) {
      return lastvalue;
    }

    if (widgetZabbixMetric === 'vm.memory.size[available]') {
      console.log(maxValue * Math.pow(10,9));
      return Math.round((100 * lastvalue) / (maxValue * Math.pow(10,9)));
    }

    return 33;
  }

  return (
    <>
      <StyledTypography>ZabbixWidget</StyledTypography>
      {
        checkMetricHasProgress() ? (
          <SemiCircleProgress diameter={setProgressSize()} percentage={calculatePercentageValue()} showPercentValue />
        ) : (
          <p>{ lastvalue }</p> // TBD
        )
      }
    </>
  );
};

export default ZabbixWidget;
