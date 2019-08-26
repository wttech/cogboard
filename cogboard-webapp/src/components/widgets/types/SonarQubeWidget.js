import React from 'react';
import { string, object } from "prop-types";

import { Typography } from '@material-ui/core';
import { Caption, FullWidthButtonOutlined } from "../../styled";

const SonarQubeWidgetContent = props => {
  const { metrics, id, url, version, date, errorMessage } = props;
  const ts = date ? new Date(Date.parse(date)).toLocaleString() : '';

  return (
    errorMessage === '' ?
      <>
        <Caption>
          {ts}
        </Caption>
        <Caption>
          Version: {version}
        </Caption>
          {Object.entries(metrics).map(([metric, val]) =>
           <Caption>{metric.replace('_', ' ')}: {val}</Caption>
          )}
        <FullWidthButtonOutlined href={url}>
          #{id}
        </FullWidthButtonOutlined>
      </>
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