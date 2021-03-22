import React from 'react';
import { number, string, object } from 'prop-types';

import { capitalize } from '../../../utils/common';
import { Caption, ClickableContentWrapper } from '../../styled';

const SonarQubeWidget = props => {
  const { metrics, url, version, date } = props;
  const ts = date ? new Date(Date.parse(date)).toLocaleString() : '';
  const sortedMetricsList = Object.entries(metrics).sort();

  return (
    <ClickableContentWrapper href={url}>
      <Caption>{ts}</Caption>
      {version === '-' ? null : <Caption>Version: {version}</Caption>}
      {sortedMetricsList.map(([metric, val]) => (
        <Caption key={metric}>
          {capitalize(metric.replace('_', ' '))}: {val}
        </Caption>
      ))}
    </ClickableContentWrapper>
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
