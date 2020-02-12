import React from 'react';
import Cookies from 'js-cookie';

import { URL } from '../../constants';

import { Button } from '@material-ui/core';

const NewVersionButtons = ({ version, url, handleClose }) => {
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

export default NewVersionButtons;
