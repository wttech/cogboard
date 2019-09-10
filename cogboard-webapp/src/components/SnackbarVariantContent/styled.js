import React from "react";
import styled from "@emotion/styled/macro";
import {SnackbarContent} from "@material-ui/core";

import {mapVariantToColor} from "./helpers";

export const SpanIcon = styled.span`
    display: flex;
    alignItems: center;
    justifyContent: center;
`;

export const IconStyles = {
  opacity: '0.9',
  marginRight: '10px',
  fontSize: '20'
};

export const StyledSnackbarContent = styled(({ variant, ...other }) => <SnackbarContent {...other} />)`
  background: ${({ variant }) => mapVariantToColor(variant)};
`;
