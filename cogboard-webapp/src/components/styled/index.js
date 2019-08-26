import React from 'react';
import styled from '@emotion/styled/macro';

import { Button, Typography } from '@material-ui/core';

const StyledTypography = styled(Typography)`
  margin-bottom: 5px;
`;

export const FullWidthButtonOutlined = (props) => <Button {...props} fullWidth="true" variant="outlined" target="_blank"/>;

export const Caption = (props) => <StyledTypography {...props} variant="caption" paragraph="true"/>;