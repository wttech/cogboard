import React from 'react';
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
    <WidgetIconButton aria-label="Toggle status" data-cy={`checkbox-${status}`} onClick={handleChangeStatus}>
      <StatusIcon size="large" status={status} />
    </WidgetIconButton>
  );
};

export default CheckboxWidget;