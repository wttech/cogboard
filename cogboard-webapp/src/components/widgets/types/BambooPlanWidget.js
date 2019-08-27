import React from 'react';
import { string, number } from 'prop-types';

import { Caption, ColumnBox, WidgetButton } from "../../styled";

const BambooPlanWidget = props => {
  const { url, number, lifeCycleState } = props;

  return (
    <ColumnBox>
      <Caption>
        State: {lifeCycleState}
      </Caption>
      <WidgetButton href={url}>
        #{number}
      </WidgetButton>
    </ColumnBox>
  );
};

BambooPlanWidget.propTypes = {
  url: string.isRequired,
  number: number.isRequired,
  lifeCycleState: string.isRequired
};

export default BambooPlanWidget;