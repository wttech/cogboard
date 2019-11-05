import React from 'react';
import { useSelector } from 'react-redux';

import { getAllNotifications } from '../../selectors';

import SnackbarWithVariant from '../SnackbarWithVariant';

const Notifications = () => {
  const allNotifications = useSelector(getAllNotifications);

  return allNotifications.map(id => (
    <SnackbarWithVariant
      horizontal="center"
      key={id}
      notificationId={id}
      vertical="top"
    />
  ));
};

export default Notifications;
