import React from 'react';
import styled from '@emotion/styled/macro';

import {Button, FormControl, Typography} from '@material-ui/core';
import IFrameEmbed from "../IFrameEmbed";

const StyledTypography = styled(Typography)`
  margin-bottom: 5px;
`;

const FullWidthButtonOutlined = (props) => <Button {...props} fullWidth variant="outlined" target="_blank" />;

export const WidgetButton = styled(FullWidthButtonOutlined)`
  margin-top: auto;
`;

export const Caption = (props) => <StyledTypography {...props} variant="caption" paragraph />;

export const StyledIFrame = (props) => <IFrameEmbed {...props} frameBorder={0} allowFullScreen/>;

export const StyledFormControlForDropdown = styled(FormControl)`
      display: flex;
      margin-bottom: 12px;
      min-width: 300px;
    `;