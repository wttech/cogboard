import React from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import { waitingForNewVersion } from '../actions/actionCreators';
import { URL } from '../constants';

import { Button } from '@material-ui/core';

export const newVersionActionCreator = appInfo => {
  const {
    latestVersion,
    latestResponse: { html_url: url }
  } = appInfo;
  const skipVersion = Cookies.get('skipVersion');

  if (latestVersion === skipVersion) {
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
    handleClose();
  };

  const handleSkipVersion = time => () => {
    Cookies.set('skipVersion', version, { path: '/', expires: time });
    handleCloseWithStateChange();
  };

  return (
    <>
      <Button color="secondary" onClick={handleSkipVersion(1000)}>
        Skip
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
        Update
      </Button>
      <Button href={url} target="_blank" color="primary">
        Release note
      </Button>
    </>
  );
};

export default NewVersionAction;
