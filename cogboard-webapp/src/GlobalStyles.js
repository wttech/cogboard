import React from 'react';
import { Global, css } from '@emotion/core';

export default function GlobalStyles() {
  return <Global
    styles={css`
      body {
        height: 100vh;
      }
    `}
  />;
};