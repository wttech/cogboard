import React from 'react';
import { string, number } from 'prop-types';

import { Caption, ClickableContentWrapper } from '../../styled';

const JenkinsJobWidget = ({
  branch,
  displayName,
  duration,
  timestamp,
  url
}) => {
  const ts = timestamp ? new Date(timestamp).toLocaleString() : '';
  const dur = duration ? `${duration / 1000} [s]` : '';

  return (
    <ClickableContentWrapper href={url}>
      <Caption>{displayName}</Caption>
      <Caption>{ts}</Caption>
      <Caption>Duration: {dur}</Caption>
      <Caption>{branch}</Caption>
    </ClickableContentWrapper>
  );
};

JenkinsJobWidget.propTypes = {
  duration: number.isRequired,
  displayName: string.isRequired,
  url: string.isRequired,
  timestamp: number.isRequired,
  branch: string
};

JenkinsJobWidget.defaultProps = {
  branch: 'unknown'
};

export default JenkinsJobWidget;
