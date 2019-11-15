import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setWidgetState } from '../../../../actions/thunks';
import getNextStatus from './helpers';

import { WidgetIconButton } from '../../../styled';
import StatusIcon from '../../../StatusIcon';

const CheckboxWidget = props => {
  const { id } = props;
  const { status } = useSelector(({ widgets }) => widgets.widgetsById[id]);
  const dispatch = useDispatch();

  const ariaCheckedStatusMap = {
    OK: true,
    FAIL: false,
    UNKNOWN: 'mixed'
  };

  const handleChangeStatus = () => {
    dispatch(
      setWidgetState({
        id,
        status: getNextStatus(status)
      })
    );
  };

  return (
    <WidgetIconButton
      aria-label="Toggle status"
      aria-checked={ariaCheckedStatusMap[status]}
      data-cy="checkbox"
      onClick={handleChangeStatus}
    >
      <StatusIcon size="large" status={status} />
    </WidgetIconButton>
  );
};

export default CheckboxWidget;
