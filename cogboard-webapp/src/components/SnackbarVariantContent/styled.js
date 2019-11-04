import React from "react";
import styled from "@emotion/styled/macro";

import { mapVariantToColor } from "./helpers";

import { SnackbarContent } from "@material-ui/core";

export const StyledSnackbarContent = styled(({ theme, variant, ...other }) => <SnackbarContent {...other} />)`
  background: ${({ theme, variant }) => mapVariantToColor(theme, variant)};
`;
