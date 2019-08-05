import React from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled/macro';

import { saveWidget } from '../actions/thunks';
import { mapFormValuesToWidgetData } from './helpers';

import Button from '@material-ui/core/Button';
import CancelButton from './CancelButton';
import WidgetForm from './WidgetForm';

const createWidgetData = (editData, values) => ({ ...editData, ...mapFormValuesToWidgetData(values) });

const StyledCancelButton = styled(CancelButton)`
  margin-left: 20px;
`;

const EditWidget = ({ editData, closeDialog }) => {
  const dispatch = useDispatch();

  const handleSaveClick = (values) => () => {
    const widgetData = createWidgetData(editData, values);

    dispatch(saveWidget(widgetData));
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