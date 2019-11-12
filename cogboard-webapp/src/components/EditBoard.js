import React from 'react';
import { useDispatch } from 'react-redux';

import { saveBoard } from '../actions/thunks';

import BoardForm from './BoardForm';

const EditBoard = ({ closeDialog, id, ...initialFormValues }) => {
  const dispatch = useDispatch();

  const handleSaveClick = values => {
    dispatch(saveBoard({ id, ...values }));
    closeDialog();
  };

  return (
    <BoardForm
      {...initialFormValues}
      handleSubmit={handleSaveClick}
      handleCancel={closeDialog}
      boardId={id}
    />
  );
};

export default EditBoard;
