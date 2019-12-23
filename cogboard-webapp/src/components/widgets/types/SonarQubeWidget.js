import React from 'react';
import { number, string, object } from 'prop-types';

import { Caption, WidgetButton } from '../../styled';

const SonarQubeWidget = props => {
  const { metrics, url, version, date } = props;
  const ts = date ? new Date(Date.parse(date)).toLocaleString() : '';

  return (
    <>
      <Caption>{ts}</Caption>
      {version === '-' ? null : <Caption>Version: {version}</Caption>}
      {Object.entries(metrics).map(([metric, val]) => (
        <Caption key={metric}>
          {metric.replace('_', ' ')}: {val}
        </Caption>
      ))}
      <WidgetButton href={url}>OPEN DASHBOARD</WidgetButton>
    </>
  );
};

SonarQubeWidget.propTypes = {
  metrics: object,
  id: number.isRequired,
  url: string.isRequired,
  version: string,
  date: string
};

SonarQubeWidget.defaultProps = {
  metrics: {},
  version: '-',
  date: ''
};

export default SonarQubeWidget;
