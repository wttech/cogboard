import React from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled/macro';

import { editWidget } from '../actions/actionCreators';
import { mapFormValuesToWidgetData } from './helpers';

import Button from '@material-ui/core/Button';
import CancelButton from './CancelButton';
import WidgetForm from './WidgetForm';

const createWidgetData = (id, values) => ({ id, ...mapFormValuesToWidgetData(values) });

const postData = (data) => {
  const init = {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  };

  return fetch('/api/widget/update', init)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(console.error);
};

const StyledCancelButton = styled(CancelButton)`
  margin-left: 20px;
`;

const EditWidget = ({ editData, closeDialog }) => {
  const { id } = editData;
  const dispatch = useDispatch();

  const handleSaveClick = (values) => () => {
    const widgetData = createWidgetData(id, values);

    postData(widgetData);
    dispatch(editWidget(widgetData));
    closeDialog();
  }

  return (
    <WidgetForm
      initialData={editData}
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

export default EditWidget;