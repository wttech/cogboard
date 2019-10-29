import React from 'react';
import { object } from "prop-types";

import { Link } from '@material-ui/core';
import { Caption } from "../../../styled";

import { AEM_HEALTH_CHECKS } from '../../../../constants';

const AemHealthcheckWidget = props => {
  const { healthChecks } = props;

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
  healthChecks: object
};

AemHealthcheckWidget.defaultProps = {
  healthChecks: {}
};

export default AemHealthcheckWidget;