import React from 'react';
import { object, string } from 'prop-types';

import { Link } from '@material-ui/core';
import { Caption, WidgetButton } from '../../../styled';

import { AEM_HEALTH_CHECKS } from '../../../../constants';

const AemHealthcheckWidget = ({ url, healthChecks }) => {
  return (
    <>
      <div>
        {Object.entries(healthChecks).map(([name, data]) => (
          <Link href={data['url']} target="_blank">
            <Caption key={name}>
              {AEM_HEALTH_CHECKS[name]}: {data['status']}
            </Caption>
          </Link>
        ))}
      </div>
      <WidgetButton href={url}>Healthchecks</WidgetButton>
    </>
  );
};

AemHealthcheckWidget.propTypes = {
  url: string.isRequired,
  healthChecks: object
};

AemHealthcheckWidget.defaultProps = {
  healthChecks: {}
};

export default AemHealthcheckWidget;
