import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Link } from '@material-ui/core';

import { formatPullRequestTitle, preparePullRequestArray } from './helpers.js';

import { StyledNoItemsInfo } from '../../../Widget/styled';
import { StyledPullRequestContainer } from './styled';
import { StyledCircularProgress } from '../../../Loader/styled.js';

const PullRequestReminderWidget = ({ repositoryHub, pullRequests }) => {
  const [isLoading, setIsLoading] = useState(true);
  pullRequests = preparePullRequestArray(repositoryHub, pullRequests);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!pullRequests && isLoading) {
    return (
      <StyledNoItemsInfo>
        <StyledCircularProgress />
        <p>Loading pull requests...</p>
      </StyledNoItemsInfo>
    );
  } else if (!isLoading && !pullRequests) {
    return (
      <StyledNoItemsInfo>
        <InfoOutlinedIcon fontSize="large" />
        <p>API rate limit exceeded!</p>
      </StyledNoItemsInfo>
    );
  }

  return (
    <>
      {pullRequests.length > 0 ? (
        pullRequests.map(({ id, title, url }, index) => (
          <Link key={id} href={url} target="_blank">
            <StyledPullRequestContainer>
              {`${index + 1}. ${formatPullRequestTitle(title)}`}
            </StyledPullRequestContainer>
          </Link>
        ))
      ) : (
        <StyledNoItemsInfo>
          <InfoOutlinedIcon fontSize="large" />
          <p>No Pull Requests</p>
        </StyledNoItemsInfo>
      )}
    </>
  );
};

PullRequestReminderWidget.propTypes = {
  pullRequests: PropTypes.array
};

PullRequestReminderWidget.defaultProps = {
  pullRequests: []
};

export default PullRequestReminderWidget;
