import React from 'react';
import { string, bool } from 'prop-types';

import { StyledLink } from './styled';

const ErrorPage = ({ title, tip, homeLink, className }) => (
  <div className={className}>
    <div>
      <h1>{title}</h1>
      <h3>{tip}</h3>

      {homeLink && <p>You could go back to the <StyledLink to="/">Home page</StyledLink></p>}
    </div>
  </div>
);

ErrorPage.propTypes = {
  title: string,
  tip: string,
  homeLink: bool
};

export default ErrorPage;