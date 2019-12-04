import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import * as PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';

const HideableTextField = styled(TextField)`
  width: 100px;
  height: 32px;

  &.hidden {
    display: none;
    visibility: hidden;
  }
`;

const StyledContainer = styled('span')`
  float: right;

  & .MuiFormControl-marginDense {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const TEXT_FIELD_ID = 'component-id-display';

class ComponentIdDisplay extends React.Component {
  toggle() {
    const element = document.querySelector(`#${TEXT_FIELD_ID}`);

    if (element) element.parentElement.parentElement.classList.toggle('hidden');
  }

  render() {
    const { componentId } = this.props;

    if (!componentId) return null;

    return (
      <StyledContainer>
        <HideableTextField
          id={TEXT_FIELD_ID}
          label="ID"
          value={componentId}
          inputProps={{ readOnly: true }}
          className="hidden"
          variant="outlined"
          margin="dense"
        />
        <Tooltip title="Show/hide component ID" arrow>
          <IconButton onClick={this.toggle} size="small">
            <FingerprintIcon />
          </IconButton>
        </Tooltip>
      </StyledContainer>
    );
  }
}

ComponentIdDisplay.propTypes = { componentId: PropTypes.string };

export default ComponentIdDisplay;
