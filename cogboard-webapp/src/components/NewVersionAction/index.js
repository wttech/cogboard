import React from 'react';
import { useCookies } from 'react-cookie';

import { Button } from '@material-ui/core';

import { compareVersionNumbers } from './helper';

export const newVersionActionCreator = (
  appInfo,
  githubResponse,
  skipVersion
) => {
  const { version: currentVersion } = appInfo;
  const { tag_name: latestVersion, html_url: url } = githubResponse;

  if (
    latestVersion === skipVersion ||
    compareVersionNumbers(currentVersion, latestVersion.substring(1)) !== -1
  ) {
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

  const handleSkipVersion = event => {
    event.stopPropagation();
    setCookie('skipVersion', version, { path: '/', maxAge: 31556926 });
    handleClose();
  };

  return (
    <>
      <Button color="secondary" onClick={handleSkipVersion}>
        Skip version
      </Button>
      <Button href={url} target="_blank" color="primary">
        Learn more!
      </Button>
    </>
  );
};

export default NewVersionAction;
