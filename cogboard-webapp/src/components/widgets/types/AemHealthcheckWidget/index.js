import React from 'react';
import { object, string } from 'prop-types';

import { Link } from '@material-ui/core';
import { StyledContainerBox, CaptionWithMargin } from '../../../styled';

import { AEM_HEALTH_CHECKS } from '../../../../constants';

const AemHealthcheckWidget = ({ url, healthChecks }) => {
  const sortedMHealthCheckList = Object.entries(healthChecks).sort((a, b) => {
    const firstArrayName = a[0].toLowerCase();
    const secondArrayName = b[0].toLowerCase();

    if (firstArrayName < secondArrayName) return -1;
    if (firstArrayName > secondArrayName) return 1;
    return 0;
  });

  const healthCheckName = (value) => AEM_HEALTH_CHECKS.find(el => el.value === value).display;

  return (
    <>
      <StyledContainerBox>
        {sortedMHealthCheckList.map(([name, data]) => (
          <Link key={ `${name}-link` } href={data['url']} target="_blank">
            <CaptionWithMargin>
              {healthCheckName(name)}: {data['status']}
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
