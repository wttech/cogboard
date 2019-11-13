import React from 'react';
import {
  Check,
  Close,
  IndeterminateCheckBoxOutlined
} from '@material-ui/icons';

const StatusIcon = ({ status, size }) => {
  const iconComponents = {
    OK: Check,
    FAIL: Close,
    UNKNOWN: IndeterminateCheckBoxOutlined
  };

  const IconComponent =
    status in iconComponents
      ? iconComponents[status]
      : iconComponents['UNKNOWN'];

  return <IconComponent fontSize={size} />;
};

export default StatusIcon;
