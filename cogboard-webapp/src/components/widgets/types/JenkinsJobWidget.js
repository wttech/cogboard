import React from 'react';
import { string, number } from 'prop-types';

import { Caption, FullWidthButtonOutlined } from "../../styled";

const JenkinsJobWidget = props => {
  const { duration, displayName, url, timestamp, branch } = props;
  const ts = timestamp ? new Date(timestamp).toLocaleString() : '';
  const dur = duration ? `${duration / 1000} [s]` : '';

  return (
    <>
      <Caption>
        {ts}
      </Caption>
      <Caption>
        Duration: {dur}
      </Caption>
      <Caption>
          {branch}
      </Caption>
      <FullWidthButtonOutlined href={url}>
        {displayName}
      </FullWidthButtonOutlined>
    </>
  );
};

JenkinsJobWidget.propTypes = {
  duration: number.isRequired,
  displayName: string.isRequired,
  url: string.isRequired,
  timestamp: number,
  branch: string
};

JenkinsJobWidget.defaultProps = {
  displayName: '#',
};

export default JenkinsJobWidget;