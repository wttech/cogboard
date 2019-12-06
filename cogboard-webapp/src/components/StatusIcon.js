import React from 'react';
import { string } from 'prop-types';

import { Warning, Check } from '@material-ui/icons';
import Loader from './Loader';

const statusIcons = {
  ERROR_CONFIGURATION: Warning,
  IN_PROGRESS: Loader,
  OK: Check
};

const StatusIcon = ({ status, size }) => {
  const IconComponent = statusIcons[status] || null;
  const sizeProp = status === 'IN_PROGRESS' ? { size: 26 } : { fontSize: size };

  return IconComponent && <IconComponent color="inherit" {...sizeProp} />;
};

export default StatusIcon;

StatusIcon.propTypes = {
  status: string
};
