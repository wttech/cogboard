import React from 'react';
import { string, number } from 'prop-types';

import { Caption, WidgetButton } from "../../styled";
import {Typography} from "@material-ui/core";

const BambooPlanWidget = props => {
  const { url, number, lifeCycleState, errorMessage } = props;

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
  lifeCycleState: string.isRequired,
  errorMessage: string
};

BambooPlanWidget.defaultProps = {
  errorMessage: undefined
};

export default BambooPlanWidget;