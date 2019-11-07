import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useToggle } from '../hooks';
import { createGetNotification } from '../selectors';
import { deleteNotification } from '../actions/actionCreators';

import Snackbar from '@material-ui/core/Snackbar/index';
import SnackbarVariantContent from "./SnackbarVariantContent";

const SnackbarWithVariant = React.memo(({ notificationId, vertical, horizontal, 'data-cy': dataCy }) => {
  const getNotification = useMemo(createGetNotification, []);
  const { type, message, duration } = useSelector(state => getNotification(state, notificationId))
  const dispatch = useDispatch();
  const [isOpened, , closeSnackbar] = useToggle(true);

  const handleClose = (event, reason) => {
    if (reason !== 'timeout') {
      return;
    }

    closeSnackbar();
  };

  const handleExited = () => dispatch(deleteNotification(notificationId));

  return (
    <Snackbar
      onClose={handleClose}
      onExited={handleExited}
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={duration}
      disableWindowBlurListener
      open={isOpened}
      data-cy={dataCy}
    >
      <SnackbarVariantContent
        variant={type}
        message={message}
      />
    </Snackbar>
  );
});

export default SnackbarWithVariant;