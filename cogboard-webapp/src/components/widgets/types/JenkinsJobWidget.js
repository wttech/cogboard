import React from 'react';
import { string, number } from 'prop-types';

import { Caption, WidgetButton } from "../../styled";
import {Typography} from "@material-ui/core";

const JenkinsJobWidget = props => {
  const { duration, displayName, url, timestamp, branch, errorMessage } = props;
  const ts = timestamp ? new Date(timestamp).toLocaleString() : '';
  const dur = duration ? `${duration / 1000} [s]` : '';

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
        Duration: {dur}
      </Caption>
      <Caption>
          {branch}
      </Caption>
      <WidgetButton href={url}>
        {displayName}
      </WidgetButton>
    </>
  );
};

JenkinsJobWidget.propTypes = {
  duration: number.isRequired,
  displayName: string.isRequired,
  url: string.isRequired,
  timestamp: number.isRequired,
  branch: string,
  errorMessage: string
};

JenkinsJobWidget.defaultProps = {
  branch: 'unknown',
  errorMessage: undefined
};

export default JenkinsJobWidget;