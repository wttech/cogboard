import React from 'react';
import { string } from 'prop-types';

import { Warning, Check } from '@material-ui/icons';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import BlockIcon from '@material-ui/icons/Block';
import PortableWifiOffIcon from '@material-ui/icons/PortableWifiOff';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Loader from './Loader';

const statusIcons = {
  ERROR: ErrorOutlineIcon,
  ERROR_CONNECTION: PortableWifiOffIcon,
  ERROR_CONFIGURATION: Warning,
  IN_PROGRESS: Loader,
  OK: Check,
  UNKNOWN: HelpOutlineIcon,
  UNSTABLE: ShowChartIcon,
  FAIL: BlockIcon
};

const StatusIcon = ({ status, size }) => {
  const IconComponent = statusIcons[status] || null;
  const sizeProp = status === 'IN_PROGRESS' ? { size: 26 } : { fontSize: size };

  return IconComponent && <IconComponent color="inherit" {...sizeProp} />;
};

export default StatusIcon;

StatusIcon.propTypes = {
  status: string,
  size: string
};
