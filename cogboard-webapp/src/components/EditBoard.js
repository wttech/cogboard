import React from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled/macro';

import { saveBoard } from '../actions/thunks';

import { Button } from '@material-ui/core'
import BoardForm from './BoardForm';
import CancelButton from './CancelButton';

const StyledCancelButton = styled(CancelButton)`
  margin-left: 20px;
`;

const EditBoard = ({ closeDialog, id, ...initialFormValues }) => {
  const dispatch = useDispatch()

  const handleSaveClick = (values) => {
    const { title, columns, switchInterval } = values;
    values.title = title.trim().replace(/\s+/g,' ');
    values.columns = parseInt(columns);
    if (switchInterval !== undefined) {
      values.switchInterval = parseInt(switchInterval)
    }
    dispatch(saveBoard({ id, ...values }));
    closeDialog();
  };

  return (
    <BoardForm
      {...initialFormValues}
      onSubmit={handleSaveClick}
      boardId={id}
      renderActions={() => (
        <>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            data-cy="board-form-submit-button"
          >
            Save
          </Button>
          <StyledCancelButton 
            handleCancelClick={closeDialog} 
            data-cy="board-form-cancel-button"
          />
        </>
      )}
    />
  );
};

export default EditBoard;