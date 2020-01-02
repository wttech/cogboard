import React from 'react';
import { object, string } from 'prop-types';

import { Link } from '@material-ui/core';
import { StyledContainerBox, CaptionWithMargin } from '../../../styled';

import { AEM_HEALTH_CHECKS } from '../../../../constants';

const AemHealthcheckWidget = ({ url, healthChecks }) => {
  return (
    <>
      <StyledContainerBox>
        {Object.entries(healthChecks).map(([name, data]) => (
          <Link href={data['url']} target="_blank">
            <CaptionWithMargin key={name}>
              {AEM_HEALTH_CHECKS[name]}: {data['status']}
            </CaptionWithMargin>
          </Link>
        ))}
      </StyledContainerBox>
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
