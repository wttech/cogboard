import React from 'react';
import { string } from "prop-types";
import { useDispatch, useSelector } from 'react-redux';

import { setWidgetState } from '../../../../actions/thunks';
import getNextStatus from './helpers';

import { WidgetIconButton } from "../../../styled";
import StatusIcon from '../../../StatusIcon';

const CheckboxWidget = props => {
  const { id } = props;
  const { status } = useSelector(({ widgets }) => widgets.widgetsById[id]);
  const dispatch = useDispatch();

  const handleChangeStatus = () => {
    dispatch(setWidgetState({
      id,
      status: getNextStatus(status)
    }));
  };

  return (
    <WidgetIconButton aria-label="Toggle status" onClick={handleChangeStatus}>
      <StatusIcon size="large" status={status} />
    </WidgetIconButton>
  );
};

CheckboxWidget.propTypes = {
  status: string.isRequired
};

export default CheckboxWidget;