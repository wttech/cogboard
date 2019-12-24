import React from 'react';
import { string } from 'prop-types';

import {
  Warning,
  Check,
  HelpOutline,
  ShowChart,
  Block,
  PortableWifiOff,
  ErrorOutline
} from '@material-ui/icons';
import Loader from './Loader';

const statusIcons = {
  ERROR: ErrorOutline,
  ERROR_CONNECTION: PortableWifiOff,
  ERROR_CONFIGURATION: Warning,
  IN_PROGRESS: Loader,
  OK: Check,
  UNKNOWN: HelpOutline,
  UNSTABLE: ShowChart,
  FAIL: Block
};

const iconSizes = {
  default: 24,
  small: 17.5,
  large: 30.5
};

const StatusIcon = ({ status, size }) => {
  const IconComponent = statusIcons[status] || null;
  const sizeProp =
    status === 'IN_PROGRESS' ? { size: iconSizes[size] } : { fontSize: size };

  return IconComponent && <IconComponent color="inherit" {...sizeProp} />;
};

export default StatusIcon;

StatusIcon.propTypes = {
  status: string,
  size: string
};

StatusIcon.defaultProps = {
  status: '',
  size: ''
};
