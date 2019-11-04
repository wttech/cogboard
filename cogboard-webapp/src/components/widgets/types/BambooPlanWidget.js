import React from 'react';
import { string, number } from 'prop-types';

import { Caption, WidgetButton } from "../../styled";

const BambooPlanWidget = ({ url, number, lifeCycleState }) => {

  return (
    <>
      <Caption>
        State: {lifeCycleState}
      </Caption>
      <WidgetButton href={url}>
        #{number}
      </WidgetButton>
    </>
  );
};

BambooPlanWidget.propTypes = {
  url: string.isRequired,
  number: number.isRequired,
  lifeCycleState: string.isRequired
};

export default BambooPlanWidget;