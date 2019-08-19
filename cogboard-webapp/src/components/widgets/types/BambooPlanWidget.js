import React from 'react';
import { string, number, object } from 'prop-types';

import { Typography } from '@material-ui/core';
import { FullWidthButtonOutlined } from "../../styled";

const BambooPlanWidget = props => {
  const { link, number, lifeCycleState } = props;
  const { href  } = link;
  const updated = new Date().toLocaleString();

  return (
    <>
      <Typography
        variant="caption">
        <p>Updated: {updated}</p>
        <p>State: {lifeCycleState}</p>
      </Typography>
      <FullWidthButtonOutlined href={href}>
        #{number}
      </FullWidthButtonOutlined>
    </>
  );
};

BambooPlanWidget.propTypes = {
  link: object.isRequired,
  number: number.isRequired,
  lifeCycleState: string.isRequired
};

BambooPlanWidget.defaultProps = {
  link: {
    href: "#"
  },
  number: 0,
  lifeCycleState: "unknown"
};

export default BambooPlanWidget;