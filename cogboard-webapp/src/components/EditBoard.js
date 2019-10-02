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

  const handleSaveClick = (values) => () => {
    dispatch(saveBoard({ id, ...values }));
    closeDialog();
  };

  return (
    <BoardForm
      {...initialFormValues}
      renderActions={values =>
        <>
          <Button
            onClick={handleSaveClick(values)}
            color="primary"
            variant="contained"
            data-cy="board-form-submit-button"
          >
            Save
          </Button>
          <StyledCancelButton 
            handleCancelClick={closeDialog} 
            data-cy="board-form-cancel-button"
          />
        </>
      }
    />
  );
};

export default EditBoard;