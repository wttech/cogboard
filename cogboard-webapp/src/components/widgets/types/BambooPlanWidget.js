import React from 'react';
import { string, number } from 'prop-types';

import { Caption, ClickableContentWrapper } from '../../styled';

const BambooPlanWidget = ({ url, number, lifeCycleState }) => {
  return (
    <ClickableContentWrapper href={url}>
      <Caption>State: {lifeCycleState}</Caption>
      <Caption>#{number}</Caption>
    </ClickableContentWrapper>
  );
};

BambooPlanWidget.propTypes = {
  url: string.isRequired,
  number: number.isRequired,
  lifeCycleState: string.isRequired
};

export default BambooPlanWidget;
