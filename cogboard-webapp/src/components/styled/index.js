import React from 'react';
import styled from '@emotion/styled/macro';

import { Button, FormControl, Typography, IconButton } from '@material-ui/core';

import IFrameEmbed from "../IFrameEmbed";
import { setSize } from "../helpers";

const StyledTypography = styled(Typography)`
  margin-bottom: 5px;
`;

const FullWidthButtonOutlined = (props) => <Button {...props} fullWidth variant="outlined" target="_blank" />;

export const WidgetButton = styled(FullWidthButtonOutlined)`
  margin-top: auto;
`;

export const WidgetIconButton = styled(IconButton)`
  border-radius: 0;
  height: 100%;
  left: 0;
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
`;

export const Caption = (props) => <StyledTypography {...props} variant="caption" paragraph />;

export const StyledFieldset = styled(FormControl)`
  display: flex;
  margin-bottom: 32px;
  min-width: 300px;
`;

export const StyledIFrame = (props) => <IFrameEmbed {...props} frameBorder={0} allowFullScreen height="100%"/>;

export const StyledFormControlForDropdown = styled(FormControl)`
      display: flex;
      margin-bottom: 12px;
      min-width: 300px;
    `;

export const StyledTitle = styled(Typography)`
  align-self: center;
  flex-grow: 1;
  font-size: 2rem;
  margin-left: 1rem;
  overflow: hidden;
  padding-right: 2rem;
  text-overflow: ellipsis;
  white-space: nowrap;

  &::after {
    background-color: #ff8a65;
    content: '';
    display: block;
    height: 2px;
    margin-top: ${setSize(2)};
    margin-left: 3px;
    width: ${setSize(10)};
  }
`;