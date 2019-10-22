import React from 'react';
import { Link } from "@reach/router"
import { string, bool } from 'prop-types';

import styled from '@emotion/styled/macro';


const StyledLink = styled(Link)`
  font-size: 16px;
  color: inherit;
  text-decoration: none;
  border-bottom: 2px solid;
  padding-bottom: 4px;
  border-color: #ff8a65;
`;

const ErrorPage = ({ title, tip, homeLink, className }) => (
  <div className={className}>
    <center>
      <h1>{title}</h1>
      <h3>{tip}</h3>

      {homeLink && <p>You could go back to the <StyledLink to="/">Home page</StyledLink></p>}
    </center>
  </div>
)

ErrorPage.propTypes = {
  title: string,
  tip: string, 
  homeLink: bool
}

export default ErrorPage;