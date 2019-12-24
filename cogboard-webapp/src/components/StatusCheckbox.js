import React from 'react';
import {
  Check,
  Close,
  IndeterminateCheckBoxOutlined
} from '@material-ui/icons';

const StatusCheckbox = ({ status, size }) => {
  const iconComponents = {
    CHECKBOX_OK: Check,
    CHECKBOX_FAIL: Close,
    CHECKBOX_UNKNOWN: IndeterminateCheckBoxOutlined
  };

  const IconComponent =
    status in iconComponents
      ? iconComponents[status]
      : iconComponents['CHECKBOX_UNKNOWN'];

  return <IconComponent fontSize={size} />;
};

export default StatusCheckbox;
