import React from 'react';
import { func, oneOf, string, node } from 'prop-types';
import { useTheme } from '@material-ui/styles';

import { Box } from '@material-ui/core';
import IconVariant from '../IconVariant';
import { StyledSnackbarContent } from './styled';

const SnackbarVariantContent = ({ message, variant, action }) => {
  const theme = useTheme();

  return (
    <StyledSnackbarContent
      theme={theme}
      variant={variant}
      message={
        <Box display="flex" alignItems="center">
          <IconVariant variant={variant} />
          <Box marginLeft={1}>{message}</Box>
        </Box>
      }
      action={action}
    />
  );
};

SnackbarVariantContent.propTypes = {
  variant: oneOf(['error', 'info', 'success', 'warning']).isRequired,
  message: string,
  action: node,
  onClose: func
};

export default SnackbarVariantContent;
