import React from 'react';

import { Typography } from '@material-ui/core';
import { FullWidthButtonOutlined } from "../../styled";

const SonarQubeWidgetContent = props => {
  const {metrics = {}, id = '-', url = '#', version = '-', date = ''} = props;
  const ts = date ? new Date(Date.parse(date)).toLocaleString() : '';

  return (
    <>
      <Typography variant="caption">
        <p>{ts}</p>
        <p>Version: {version}</p>
        {Object.entries(metrics).map(([metric, val]) =>
          <p key={metric}>{metric.replace('_', ' ')}: {val}</p>
        )}
      </Typography>
      <FullWidthButtonOutlined href={url}>
        #{id}
      </FullWidthButtonOutlined>
    </>
  );
};

export default SonarQubeWidgetContent;