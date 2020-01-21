import React from 'react';
import { Save as SaveIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { saveData } from '../../../actions/thunks';

import { StyledActionButton } from '../styled';

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
      <StyledActionButton
        aria-label={ariaLabel}
        color={color}
        data-cy={cypressData}
        onClick={handleSaveDataClick}
      >
        <SaveIcon />
      </StyledActionButton>
    )
  );
};

export default Save;
