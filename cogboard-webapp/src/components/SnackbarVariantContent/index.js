import React from 'react';
import { func, oneOf, string } from 'prop-types';
import { useTheme } from '@material-ui/styles';

import { Box } from '@material-ui/core';
import IconVariant from '../IconVariant';
import { StyledSnackbarContent } from './styled';

const SnackbarVariantContent = ({ message, variant }) => {
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
    />
  );
};

SnackbarVariantContent.propTypes = {
  variant: oneOf(['error', 'info', 'success', 'warning']).isRequired,
  message: string,
  onClose: func
};

export default SnackbarVariantContent;
