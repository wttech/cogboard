import React from "react";
import styled from "@emotion/styled/macro";
import {SnackbarContent} from "@material-ui/core";

import {mapVariantToColor} from "./helpers";

export const SpanIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSnackbarContent = styled(({ theme, variant, ...other }) => <SnackbarContent {...other} />)`
  background: ${({ theme, variant }) => mapVariantToColor(theme, variant)};
`;
