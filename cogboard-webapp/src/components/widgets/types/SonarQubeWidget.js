import React from 'react';
import { number, string, object } from "prop-types";

import { Typography } from '@material-ui/core';
import { Caption, WidgetButton } from "../../styled";

const SonarQubeWidgetContent = props => {
  const { metrics, id, url, version, date, errorMessage } = props;
  const ts = date ? new Date(Date.parse(date)).toLocaleString() : '';

  if (errorMessage) {
    return (
      <Typography variant="h5">
        {errorMessage}
      </Typography>
    );
  }

  return (
    <>
      <Caption>
        {ts}
      </Caption>
      <Caption>
        Version: {version}
      </Caption>
        {Object.entries(metrics).map(([metric, val]) =>
          <Caption key={metric}>{metric.replace('_', ' ')}: {val}</Caption>
        )}
      <WidgetButton href={url}>
        #{id}
      </WidgetButton>
    </>
  );
};

SonarQubeWidgetContent.propTypes = {
  metrics: object,
  id: number.isRequired,
  url: string.isRequired,
  version: string,
  date: string,
  errorMessage: string
};

SonarQubeWidgetContent.defaultProps = {
  metrics: {},
  version: '-',
  date: '',
  errorMessage: ''
};

export default SonarQubeWidgetContent;