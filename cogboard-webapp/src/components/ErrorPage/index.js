import React from 'react';
import { string, bool } from 'prop-types';
import { useTheme } from '@material-ui/styles';

import { Typography } from '@material-ui/core';
import { StyledLink } from './styled';

const ErrorPage = ({ title, tip, homeLink, className }) => {
  const theme = useTheme();

  return (
    <div className={className}>
      <div>
        <Typography variant="h3" color="primary">
          {title}
        </Typography>
        <Typography variant="h5" color="primary">
          {tip}
        </Typography>

        {homeLink && (
          <p>
            You could go back to the{' '}
            <StyledLink to="/" theme={theme}>
              Home page
            </StyledLink>
          </p>
        )}
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  title: string,
  tip: string,
  homeLink: bool
};

export default ErrorPage;
