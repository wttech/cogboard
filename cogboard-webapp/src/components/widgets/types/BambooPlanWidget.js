import React from 'react';
import { string, number } from 'prop-types';

import { Caption, ClickableContentWrapper } from '../../styled';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../../selectors';

const BambooPlanWidget = ({ url, lifeCycleState }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <ClickableContentWrapper href={url} disabled={isAuthenticated}>
      <Caption>State: {lifeCycleState}</Caption>
    </ClickableContentWrapper>
  );
};

BambooPlanWidget.propTypes = {
  url: string.isRequired,
  number: number.isRequired,
  lifeCycleState: string.isRequired
};

export default BambooPlanWidget;
