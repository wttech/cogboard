import React from 'react';
import { string } from 'prop-types';

import { Typography } from '@material-ui/core';
import { StyledCircularProgress } from './styled';

const Loader = ({ text, ...other }) => (
  <>
    {text && <Typography variant="caption">{text}</Typography>}
    <StyledCircularProgress {...other} />
  </>
);

export default Loader;

Loader.propTypes = {
  text: string
};

Loader.defaultProps = {
  text: ''
};
