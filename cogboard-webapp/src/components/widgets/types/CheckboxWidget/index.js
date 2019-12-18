import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setWidgetState } from '../../../../actions/thunks';
import getNextStatus from './helpers';

import { WidgetIconButton } from '../../../styled';
import StatusCheckbox from '../../../StatusCheckbox';

import { postWidgetContentUpdate } from '../../../../utils/fetch';
import { getWidgetStatus } from '../../../../utils/components';

const CheckboxWidget = ({ id }) => {
  const dispatch = useDispatch();
  const { content } = useSelector(({ widgets }) => widgets.widgetsById[id]);
  const widgetStatus = getWidgetStatus(content, 'CheckboxWidget');

  const ariaCheckedStatusMap = {
    CHECKBOX_OK: true,
    CHECKBOX_FAIL: false,
    CHECKBOX_UNKNOWN: 'mixed'
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
      <StatusCheckbox size="large" status={widgetStatus} />
    </WidgetIconButton>
  );
};

export default CheckboxWidget;
