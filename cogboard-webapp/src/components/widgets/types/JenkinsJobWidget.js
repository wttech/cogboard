import React from 'react';
import { string, number } from 'prop-types';

import { Typography } from '@material-ui/core';
import { FullWidthButtonOutlined } from "../../styled";

const JenkinsJobWidget = props => {
  const { duration, displayName, url, timestamp, branch } = props;
  const ts = timestamp ? new Date(timestamp).toLocaleString() : '';
  const dur = duration ? `${duration / 1000} [s]` : '';

  return (
    <>
      <Typography
        variant="caption">
        <p>{ts}</p>
        <p>Duration: {dur}</p>
        <p>Branch: {branch}</p>
      </Typography>
      <FullWidthButtonOutlined href={url}>
        {displayName}
      </FullWidthButtonOutlined>
    </>
  );
};

JenkinsJobWidget.propTypes = {
  duration: number,
  displayName: string,
  url: string.isRequired,
  timestamp: number,
  branch: string
};

JenkinsJobWidget.defaultProps = {
  displayName: '#',
  url: '#',
};

export default JenkinsJobWidget;