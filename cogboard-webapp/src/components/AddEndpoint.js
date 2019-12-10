import React from 'react';
import { useDispatch } from 'react-redux';

import { saveEndpoint } from '../actions/thunks';

import AddItem from './AddItem';
import EndpointForm from './EndpointForm';

const AddEndpoint = ({ largeButton, dataChanged, endpointsData }) => {
  const dispatch = useDispatch();

  const handleSubmitAction = values => {
    dispatch(saveEndpoint(values));
    if (dataChanged !== undefined) {
      dataChanged();
    }
  };

  return (
    <AddItem
      itemName="endpoint"
      largeButton={largeButton}
      submitAction={handleSubmitAction}
    >
      <EndpointForm />
    </AddItem>
  );
};

export default AddEndpoint;
