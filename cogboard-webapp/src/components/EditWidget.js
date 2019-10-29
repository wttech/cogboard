import React from 'react';
import { func, object, string, bool, number } from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled/macro';

import { saveWidget } from '../actions/thunks';

import Button from '@material-ui/core/Button';
import CancelButton from './CancelButton';
import WidgetForm from './WidgetForm';

const StyledCancelButton = styled(CancelButton)`
  margin-left: 20px;
`;

const EditWidget = ({ closeDialog, id, widgetTypeData, ...widgetData }) => {
  const initialFormValues = { ...widgetData, ...widgetTypeData };
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(saveWidget({ id, values }));
    closeDialog();
  };

  return (
    <WidgetForm
      onSubmit={handleSubmit}
      {...initialFormValues}
      renderActions={() =>
        <>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            data-cy="widget-form-submit-button"
          >
            Save
          </Button>
          <StyledCancelButton 
            handleCancelClick={closeDialog} 
            data-cy="widget-form-cancel-button"
          />
        </>
      }
    />
  );
};

EditWidget.propTypes = {
  closeDialog: func.isRequired,
  disabled: bool.isRequired,
  columns: number.isRequired,
  goNewLine: bool.isRequired,
  id: string.isRequired,
  rows: number.isRequired,
  title: string.isRequired,
  type: string.isRequired,
  widgetTypeData: object.isRequired
};

export default EditWidget;