import React from 'react';
import { string, object } from "prop-types";

import { Typography } from '@material-ui/core';
import { Caption, ColumnBox, WidgetButton } from "../../styled";

const SonarQubeWidgetContent = props => {
  const { metrics, id, url, version, date, errorMessage } = props;
  const ts = date ? new Date(Date.parse(date)).toLocaleString() : '';

  return (
    errorMessage === '' ?
      <ColumnBox>
        <Caption>
          {ts}
        </Caption>
        <Caption>
          Version: {version}
        </Caption>
          {Object.entries(metrics).map(([metric, val]) =>
           <Caption>{metric.replace('_', ' ')}: {val}</Caption>
          )}
        <WidgetButton href={url}>
          #{id}
        </WidgetButton>
      </ColumnBox>
      :
      <Typography variant="h5">
        {errorMessage}
      </Typography>
  );
};

SonarQubeWidgetContent.propTypes = {
  metrics: object,
  id: string.isRequired,
  url: string.isRequired,
  version: string,
  date: string,
  errorMessage: string
};

SonarQubeWidgetContent.defaultProps = {
  metrics: {},
  id: '-',
  url: '#',
  version: '-',
  date: '',
  errorMessage: ''
};

export default SonarQubeWidgetContent;