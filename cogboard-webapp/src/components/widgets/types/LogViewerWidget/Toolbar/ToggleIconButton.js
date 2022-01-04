import React from 'react';
import { string, elementType, bool } from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { StyledIconButton } from './styled';

const ToggleIconButton = ({ tooltip, Icon, enabled, ...props }) => {
  return (
    <Tooltip title={tooltip} placement="bottom">
      <StyledIconButton enabled={enabled} {...props}>
        <Icon />
      </StyledIconButton>
    </Tooltip>
  );
};

ToggleIconButton.propTypes = {
  tooltip: string,
  Icon: elementType.isRequired,
  enabled: bool
};

ToggleIconButton.defaultProps = {
  tooltip: '',
  enabled: false
};

export default ToggleIconButton;
