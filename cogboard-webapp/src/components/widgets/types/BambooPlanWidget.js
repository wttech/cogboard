import React from 'react';
import { string, number, object } from 'prop-types';

import { Typography } from '@material-ui/core';
import { FullWidthButtonOutlined } from '../../styled';

const BambooPlanWidget = props => {
  const { url, number, lifeCycleState } = props;
  const updated = new Date().toLocaleString();

  return (
    <>
      <Typography
        variant="caption">
        <p>Updated: {updated}</p>
        <p>State: {lifeCycleState}</p>
      </Typography>
      <FullWidthButtonOutlined href={url}>
        #{number}
      </FullWidthButtonOutlined>
    </>
  );
};

BambooPlanWidget.propTypes = {
  url: object.isRequired,
  number: number.isRequired,
  lifeCycleState: string.isRequired
};

BambooPlanWidget.defaultProps = {
  url: '#',
  number: 0,
  lifeCycleState: 'unknown'
};

export default BambooPlanWidget;