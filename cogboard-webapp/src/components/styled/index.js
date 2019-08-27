import React from 'react';
import styled from '@emotion/styled/macro';

import { Box, Button, Typography } from '@material-ui/core';

const StyledTypography = styled(Typography)`
  margin-bottom: 5px;
`;

export const ColumnBox = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FullWidthButtonOutlined = (props) => <Button {...props} fullWidth="true" variant="outlined" target="_blank"/>;

export const WidgetButton = styled(FullWidthButtonOutlined)`
  margin-top: auto;
`;

export const Caption = (props) => <StyledTypography {...props} variant="caption" paragraph="true"/>;