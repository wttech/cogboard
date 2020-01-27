import React from 'react';
import { useCookies } from 'react-cookie';

import { Button } from '@material-ui/core';
import { URL } from '../constants';

export const newVersionActionCreator = (appInfo, skipVersion) => {
  const { latestVersion, status, latestResponse } = appInfo;
  const { html_url: url } = latestResponse;

  console.log(skipVersion);
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
  const [, setCookie] = useCookies(['skipVersion']);

  const handleSkipVersion = time => event => {
    event.stopPropagation();
    setCookie('skipVersion', version, { path: '/', maxAge: time });
    handleClose();
  };

  return (
    <>
      <Button color="secondary" onClick={handleSkipVersion(31556926)}>
        Skip version
      </Button>
      {/* 86400 - one day  */}
      <Button color="secondary" onClick={handleSkipVersion(10)}>
        Remind me later
      </Button>
      <Button
        href={URL.UPDATE_INFO}
        target="_blank"
        color="primary"
        onClick={handleClose}
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
