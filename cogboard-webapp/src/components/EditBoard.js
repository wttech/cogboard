import React from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled/macro';

import { editBoard } from '../actions/actionCreators';

import { Button } from '@material-ui/core'
import BoardForm from './BoardForm';
import CancelButton from './CancelButton';

const StyledCancelButton = styled(CancelButton)`
  margin-left: 20px;
`;

const EditBoard = ({ closeDialog, id, ...initialFormValues }) => {
  const dispatch = useDispatch()

  const handleSaveClick = (values) => () => {
    dispatch(editBoard({ id, ...values }));
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
          >
            Save
          </Button>
          <StyledCancelButton handleCancelClick={closeDialog} />
        </>
      }
    />
  );
};

export default EditBoard;