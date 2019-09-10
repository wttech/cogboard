import React from "react";
import PropTypes from "prop-types";
import {CheckCircle, Error, Info, Warning} from "@material-ui/icons";
import {IconStyles, SpanIcon, StyledSnackbarContent} from "./styled";

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
};

const SnackbarVariantContent = props => {
  const { message, variant } = props;
  const Icon = variantIcon[variant];

  return (
    <StyledSnackbarContent
      variant={variant}
      message={
        <SpanIcon>
          <Icon style={IconStyles}/>
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
