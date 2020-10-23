import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import SemiCircleProgress from '../../../SemiProgressBar';
import {
  StyledMetricName,
  StyledZabbixWrapper,
  StyledNumericValue
} from './styled';
import {
  COLORS,
  ZABBIX_METRICS,
  ZABBIX_METRICS_WITH_PROGRESS,
  ZABBIX_METRICS_WITH_MAX_VALUE
} from '../../../../constants';

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

  const checkMetricHasProgress = () =>
    ZABBIX_METRICS_WITH_PROGRESS.includes(widgetZabbixMetric);
  const checkMetricHasMaxValue = () =>
    ZABBIX_METRICS_WITH_MAX_VALUE.includes(widgetZabbixMetric);

  const setProgressSize = () => {
    const widgetColumns = widgetConfig.columns;
    return progressBarWidth[`column${widgetColumns}`]
      ? progressBarWidth[`column${widgetColumns}`].diameter
      : progressBarWidth.other.diameter;
  };

  const calculatePercentageValue = () => {
    if (!lastvalue) return 0;
    if (!checkMetricHasMaxValue()) return parseInt(lastvalue, 10);

    return convertToBytes(lastvalue);
  };

  const convertMetricTitle = () => {
    if (!widgetZabbixMetric) return '';

    const metricDisplayName = ZABBIX_METRICS.find(
      item => item.value === widgetZabbixMetric
    ).display;
    return metricDisplayName;
  };

  const convertToBytes = value => {
    return Math.round((100 * value) / (maxValue * Math.pow(10, 9)));
  };

  const convertToGigaBytes = () => {
    if (!lastvalue) return 0;
    return Math.round(lastvalue / Math.pow(10, 9));
  };

  const secondsToTime = value => {
    const days = Math.floor(value / 3600 / 24).toString(),
      hours = Math.floor((value / 3600) % 24).toString(),
      minutes = Math.floor((value % 3600) / 60).toString();

    return days + 'd:' + hours + 'h:' + minutes + 'm';
  };

  const renderNoProgressContent = () => {
    const value =
      widgetZabbixMetric === 'system.uptime'
        ? secondsToTime(lastvalue)
        : parseInt(lastvalue, 10);

    return <StyledNumericValue>{value}</StyledNumericValue>;
  };

  return (
    <StyledZabbixWrapper>
      {checkMetricHasProgress() ? (
        <SemiCircleProgress
          stroke={COLORS.WHITE}
          diameter={setProgressSize()}
          percentage={calculatePercentageValue()}
          text={convertToGigaBytes()}
          showPercentValue
        />
      ) : (
        renderNoProgressContent()
      )}
      <StyledMetricName>{convertMetricTitle()}</StyledMetricName>
    </StyledZabbixWrapper>
  );
};

export default ZabbixWidget;
