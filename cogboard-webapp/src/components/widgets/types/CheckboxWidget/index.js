import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setWidgetState } from '../../../../actions/thunks';
import getNextStatus from './helpers';

import { WidgetIconButton } from '../../../styled';
import StatusIcon from '../../../StatusIcon';

import { postWidgetContentUpdate } from '../../../../utils/fetch';

const CheckboxWidget = ({ id }) => {
  const dispatch = useDispatch();
  const {
    content: { widgetStatus }
  } = useSelector(({ widgets }) => widgets.widgetsById[id]);

  const ariaCheckedStatusMap = {
    OK: true,
    FAIL: false,
    UNKNOWN: 'mixed'
  };

  const handleChangeStatus = () => {
    let nextStatus = getNextStatus(widgetStatus);
    dispatch(
      setWidgetState({
        id,
        content: {
          widgetStatus: nextStatus
        },
        withWidgetContentUpdate: true
      })
    );

    postWidgetContentUpdate({
      id,
      content: { widgetStatus: nextStatus }
    }).catch(e => console.log(e));
  };

  return (
    <WidgetIconButton
      aria-label="Toggle status"
      aria-checked={ariaCheckedStatusMap[widgetStatus]}
      data-cy="checkbox"
      onClick={handleChangeStatus}
    >
      <StatusIcon size="large" status={widgetStatus} />
    </WidgetIconButton>
  );
};

export default CheckboxWidget;
