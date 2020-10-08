import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import SemiCircleProgress from '../../../SemiProgressBar';
import { StyledTypography } from './styled';
import { ZABBIX_METRICS } from '../../../../constants';

const zabbixMetrics = { // temporary solution - we need metrics names
  withProgress: [
    'system.cpu.util[,idle]',
    'system.swap.size[,used]',
    'vm.memory.size[available]',
    'vfs.fs.size[/,used]',
    'jmx[\\"java.lang:type=Memory\\",\\"HeapMemoryUsage.used\\"]'
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
    if (!lastvalue) return 0;
    if (checkMetricHasMaxValue()) return lastvalue;

    return Math.round((100 * lastvalue) / (maxValue * Math.pow(10,9)));
  }

  const convertMetricTitle = () => {
    if (!widgetZabbixMetric) return '';

    const metricDisplayName = ZABBIX_METRICS.find(item => item.value === widgetZabbixMetric).display;
    return metricDisplayName;
  }

  const renderNoProgressContent = () => {
    let value;

    if (widgetZabbixMetric === 'system.uptime') {
      const date = new Date(0);
      date.setUTCSeconds(lastvalue);
      value = date.toLocaleString('en-GB', { hour12: false } );
    } else {
      value = lastvalue;
    }

    return (
      <StyledTypography>{ value }</StyledTypography>
    );
  }

  return (
    <>
      <StyledTypography>{ convertMetricTitle() }</StyledTypography>
      {
        checkMetricHasProgress() ? (
          <SemiCircleProgress diameter={setProgressSize()} percentage={calculatePercentageValue()} showPercentValue />
        ) : (
          renderNoProgressContent()
        )
      }
    </>
  );
};

export default ZabbixWidget;
