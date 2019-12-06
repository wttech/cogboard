import React from 'react';
import * as PropTypes from 'prop-types';

import { IconButton, Tooltip, Typography } from '@material-ui/core';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { grey } from '@material-ui/core/colors/index';
import styled from '@emotion/styled/macro';

import copy from 'copy-to-clipboard';

const StyledTooltip = styled(Tooltip)`
  float: right;
`;

const StyledTypography = styled(Typography)`
  margin-left: 5px;
  color: ${grey[500]};
`;

class ComponentIdDisplay extends React.Component {
  render() {
    const { componentId } = this.props;

    if (!componentId) {
      return null;
    }

    const copyToClipboard = id => () => {
      if (id) {
        copy(id);
      }
    };

    return (
      <>
        <StyledTypography variant="caption">
          (ID: {componentId})
        </StyledTypography>
        <StyledTooltip title="Copy component ID to clipboard" arrow>
          <IconButton onClick={copyToClipboard(componentId)} size="small">
            <FingerprintIcon />
          </IconButton>
        </StyledTooltip>
      </>
    );
  }
}

ComponentIdDisplay.propTypes = { componentId: PropTypes.string };

export default ComponentIdDisplay;
