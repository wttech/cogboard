import React from 'react';
import styled from '@emotion/styled/macro';

import { Button, Typography, IconButton } from '@material-ui/core';
import IFrameEmbed from "../IFrameEmbed";

const StyledTypography = styled(Typography)`
  margin-bottom: 5px;
`;

const FullWidthButtonOutlined = (props) => <Button {...props} fullWidth variant="outlined" target="_blank" />;

export const WidgetButton = styled(FullWidthButtonOutlined)`
  margin-top: auto;
`;

export const WidgetIconButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(-50%);
  padding: 0;
  border-radius: 0;
`;

export const Caption = (props) => <StyledTypography {...props} variant="caption" paragraph />;

export const StyledIFrame = (props) => <IFrameEmbed {...props} frameBorder={0} allowFullScreen/>;