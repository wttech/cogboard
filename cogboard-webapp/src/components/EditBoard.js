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
    const { columns } = values;
    values.columns = parseInt(columns);
    dispatch(saveBoard({ id, ...values }));
    closeDialog();
  };

  return (
    <BoardForm
      {...initialFormValues}
      onSubmit={handleSaveClick}
      renderActions={() => (
        <>
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Save
          </Button>
          <StyledCancelButton handleCancelClick={closeDialog} />
        </>
      )}
    />
  );
};

export default EditBoard;