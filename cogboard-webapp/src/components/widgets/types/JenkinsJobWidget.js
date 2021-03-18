import React from 'react';
import { string, number } from 'prop-types';

import { Caption, ClickableContentWrapper } from '../../styled';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../../selectors';

const JenkinsJobWidget = ({
  branch,
  displayName,
  duration,
  timestamp,
  url
}) => {
  const ts = timestamp ? new Date(timestamp).toLocaleString() : '';
  const dur = duration ? `${duration / 1000} [s]` : '';
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <ClickableContentWrapper href={url} disabled={isAuthenticated}>
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
