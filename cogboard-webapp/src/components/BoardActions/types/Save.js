import React from 'react';
import { Save as SaveIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { saveData } from '../../../actions/thunks';

import { StyledSaveActionButton } from '../styled';
import { Tooltip } from '@material-ui/core';

const Save = props => {
  const {
    config: { ariaLabel, color, cypressData }
  } = props;

  const isDataChanged = useSelector(({ app }) => app.isDataChanged);
  const dispatch = useDispatch();

  const handleSaveDataClick = () => {
    dispatch(saveData());
  };

  return (
    isDataChanged && (
      <Tooltip title="Save Board" placement="bottom-end">
        <StyledSaveActionButton
          aria-label={ariaLabel}
          color={color}
          data-cy={cypressData}
          onClick={handleSaveDataClick}
        >
          <SaveIcon />
        </StyledSaveActionButton>
      </Tooltip>
    )
  );
};

export default Save;
