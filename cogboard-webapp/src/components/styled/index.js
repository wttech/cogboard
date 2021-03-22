import React from 'react';
import styled from '@emotion/styled/macro';
import { COLORS } from '../../constants';

import {
  Button,
  FormControl,
  Typography,
  IconButton,
  Tabs,
  Box,
  FormHelperText
} from '@material-ui/core';
import IframeEmbed from '../IframeEmbed';
import { getColor, getSize } from '../../utils/components';
import TabPanel from '../TabPanel';

const StyledTypography = styled(Typography)`
  margin: auto auto 5px;
  font-size: 0.7rem;
`;

const FullWidthButtonOutlined = props => (
  <Button {...props} fullWidth variant="outlined" target="_blank" />
);

export const WidgetButton = styled(FullWidthButtonOutlined)`
  margin-top: auto;
`;

export const WidgetIconButton = styled(IconButton)`
  border-radius: 0;
  padding: 0;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ClickableContentWrapper = styled(FullWidthButtonOutlined)`
  border: 0;
  padding: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &.Mui-disabled {
    border: 0;
    color: ${COLORS.WHITE};
  }

  > .MuiButton-label {
    display: grid;
  }
`;

export const Caption = props => (
  <StyledTypography {...props} variant="caption" paragraph />
);

export const CaptionWithPointer = styled(Caption)`
  cursor: pointer;
  text-align: center;
  margin: auto;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
  }
`;

export const StyledFieldset = styled(FormControl)`
  display: flex;
  margin-bottom: 32px;
  min-width: 300px;

  .MuiFormLabel-root.Mui-focused {
    color: ${COLORS.WHITE};
  }

  .MuiFormLabel-root.Mui-error {
    color: ${COLORS.WHITE};
  }

  .MuiInput-underline::after,
  .MuiInput-underline.Mui-focused::after {
    border-bottom-color: ${COLORS.WHITE};
  }
`;

export const StyledIframe = props => (
  <IframeEmbed {...props} frameBorder={0} allowFullScreen height="100%" />
);

export const StyledFormControlForDropdown = styled(FormControl)`
  display: flex;
  margin-bottom: 12px;
  min-width: 300px;
`;

export const StyledTitle = styled(Typography)`
  align-self: center;
  flex-grow: 1;
  font-size: ${getSize(3)};
  margin-left: 1rem;
  margin-top: 1rem;
  overflow: hidden;
  padding-right: 2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${getColor('secondary')};

  &::after {
    background-color: ${getColor('primary')};
    content: '';
    display: block;
    height: 2px;
    margin-top: ${getSize(2)};
    margin-left: 3px;
    width: ${getSize(10)};
  }
`;

export const StyledFormControl = styled(FormControl)`
  margin: ${getSize(1)};
  min-width: 120px;
  max-width: 300px;
`;

export const StyledPopoverText = styled(Typography)`
  background: ${COLORS.WHITE};
  color: ${COLORS.BLACK};
  padding: 1rem;
`;

export const StyledTabs = styled(Tabs)`
  margin-bottom: 12px;

  .MuiTabs-indicator {
    background-color: white;
  }
`;

export const StyledTabPanel = styled(TabPanel)`
  margin-bottom: 12px;
`;

export const StyledContainerBox = styled(Box)`
  padding-left: 6px;
  padding-right: 6px;
`;

export const CaptionWithMargin = styled(Caption)`
  margin-bottom: 10px;
`;

export const StyledErrorMsg = styled(Typography)`
  display: flex;
  color: ${COLORS.YELLOW};
  font-weight: 500;

  .MuiSvgIcon-root {
    margin-right: 5px;
  }
`;

export const StyledFormFieldWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex: 1;

  .Mui-error {
    color: ${COLORS.YELLOW};
  }
`;

export const StyledFormHelperText = styled(FormHelperText)`
  display: flex;
  align-items: center;

  .MuiSvgIcon-root {
    margin-right: 5px;
  }
`;

export const StyledPowerIconButton = styled(IconButton)`
  &:hover .MuiSvgIcon-root {
    color: ${COLORS.RED};
  }
`;
