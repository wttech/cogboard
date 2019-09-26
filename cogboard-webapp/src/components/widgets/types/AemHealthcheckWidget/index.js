import React from 'react';
import { string, object } from "prop-types";

import { Link, Typography } from '@material-ui/core';
import { Caption } from "../../../styled";

import { AEM_HEALTH_CHECKS } from '../../../../constants';

const AemHealthcheckWidget = props => {
  const { healthChecks, errorMessage } = props;

  if (errorMessage) {
    return (
      <Typography variant="h5">
        {errorMessage}
      </Typography>
    );
  }

  return (
    <>
      {Object.entries(healthChecks).map(([name, data]) =>
        <Link href={data['url']} target="_blank">
         <Caption key={name}>{AEM_HEALTH_CHECKS[name]}: {data['status']}</Caption>
        </Link>
      )}
    </>
  );
};

AemHealthcheckWidget.propTypes = {
  healthChecks: object,
  errorMessage: string
};

AemHealthcheckWidget.defaultProps = {
  healthChecks: {},
  errorMessage: ''
};

export default AemHealthcheckWidget;