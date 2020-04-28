import React from 'react';
import Cookies from 'js-cookie';

import NewVersionButtons from './index';

export const newVersionButtonsCreator = appInfo => {
  const {
    latestVersion,
    latestResponse: { html_url: url }
  } = appInfo;
  const skipVersion = Cookies.get('skipVersion');

  if (latestVersion === skipVersion) {
    return;
  }

  return handleClose => (
    <NewVersionButtons
      version={latestVersion}
      url={url}
      handleClose={handleClose}
    />
  );
};
