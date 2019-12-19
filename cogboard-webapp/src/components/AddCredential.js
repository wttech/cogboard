import React from 'react';
import { useDispatch } from 'react-redux';

import { addCredential } from '../actions/thunks';

import AddItem from './AddItem';
import CredentialForm from './CredentialForm';

const AddCredential = ({ largeButton }) => {
  const dispatch = useDispatch();

  const handleSubmitAction = values => {
    delete values.passwordConfirmation;

    dispatch(addCredential(values));
  };

  return (
    <AddItem
      itemName="credential"
      largeButton={largeButton}
      submitAction={handleSubmitAction}
    >
      <CredentialForm />
    </AddItem>
  );
};

export default AddCredential;
