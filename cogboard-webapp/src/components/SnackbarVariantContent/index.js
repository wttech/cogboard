import React from "react";
import PropTypes from "prop-types";
import { useTheme } from '@material-ui/styles';

import { SpanIcon, StyledSnackbarContent } from "./styled";
import IconVariant from "../IconVariant";

const SnackbarVariantContent = props => {
  const { message, variant } = props;
  const theme = useTheme();

  return (
    <StyledSnackbarContent
      theme={theme}
      variant={variant}
      message={
        <SpanIcon>
          <IconVariant variant={variant}/>
          {message}
        </SpanIcon>
      }
    />
  );
};

SnackbarVariantContent.propTypes = {
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
  message: PropTypes.string,
  onClose: PropTypes.func
};

export default SnackbarVariantContent;
