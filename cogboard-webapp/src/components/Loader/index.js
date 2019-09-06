import React from 'react';

import { Typography } from '@material-ui/core';
import { StyledCircularProgress } from './styled';

const Loader = ({ text, ...other }) => (
  <>
    <Typography variant="caption">{text}</Typography>
    <StyledCircularProgress {...other} />
  </>
);

export default Loader;
