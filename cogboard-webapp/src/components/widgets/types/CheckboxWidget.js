import React from 'react';
import { string } from "prop-types";
import { useDispatch, useSelector } from 'react-redux';

import { setWidgetState } from '../../../actions/thunks';

import { Check, Close, IndeterminateCheckBoxOutlined } from "@material-ui/icons";
import { WidgetIconButton } from "../../styled";

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
      <StatusIcon size="large" status={status}/>
    </WidgetIconButton>
  );
};

const StatusIcon = ({ status, size }) => {
  const iconComponents = {
    OK: Check,
    FAIL: Close,
    UNKNOWN: IndeterminateCheckBoxOutlined
  };

  const IconComponent = status in iconComponents ? iconComponents[status] : iconComponents['UNKNOWN'];

  return <IconComponent fontSize={size} />;
};

const getNextStatus = (status) => {
  const statusArray = ['OK', 'FAIL', 'UNKNOWN'];
  const statusIndex = statusArray.indexOf(status);

  let nextStatusIndex = 0;

  if (statusIndex !== -1) {
    nextStatusIndex = statusIndex < statusArray.length - 1 ? statusIndex + 1 : 0;
  } else {
    nextStatusIndex = statusArray.indexOf('UNKNOWN');
  }

  return statusArray[nextStatusIndex];
};

CheckboxWidget.propTypes = {
  status: string.isRequired
};

export default CheckboxWidget;