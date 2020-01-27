import React from 'react';
import { useDispatch } from 'react-redux';

import Cookies from 'js-cookie';

import { Button } from '@material-ui/core';
import { URL } from '../constants';
import { setNewVersionNotificationInvisible } from '../actions/actionCreators';

export const newVersionActionCreator = appInfo => {
  const { latestVersion, status, latestResponse } = appInfo;
  const { html_url: url } = latestResponse;
  const skipVersion = Cookies.get('skipVersion');

  if (status !== 'newVersion' || latestVersion === skipVersion) {
    return;
  }

  return handleClose => (
    <NewVersionAction
      version={latestVersion}
      url={url}
      handleClose={handleClose}
    />
  );
};

const NewVersionAction = ({ version, url, handleClose }) => {
  const dispatch = useDispatch();

  const handleCloseWithStateChange = () => {
    dispatch(setNewVersionNotificationInvisible());
    handleClose();
  };

  const handleSkipVersion = time => () => {
    Cookies.set('skipVersion', version, { path: '/', expires: time });
    handleCloseWithStateChange();
  };

  return (
    <>
      <Button color="secondary" onClick={handleSkipVersion(1000)}>
        Skip version
      </Button>
      <Button color="secondary" onClick={handleSkipVersion(1)}>
        Remind me later
      </Button>
      <Button
        href={URL.UPDATE_INFO}
        target="_blank"
        color="primary"
        onClick={handleCloseWithStateChange}
      >
        Get new version
      </Button>
      <Button href={url} target="_blank" color="primary">
        Release note
      </Button>
    </>
  );
};

export default NewVersionAction;
