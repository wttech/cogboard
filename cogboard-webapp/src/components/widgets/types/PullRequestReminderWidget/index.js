import React from 'react';
import PropTypes from 'prop-types';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import { formatPullRequestTitle, preparePullRequestArray } from './helpers.js';

import { StyledNoItemsInfo } from '../../../Widget/styled';
import { StyledPullRequestContainer } from './styled';
import { Link } from '@material-ui/core';

const PullRequestReminderWidget = ({ repositoryHub, pullRequests }) => {
  pullRequests = preparePullRequestArray(repositoryHub, pullRequests);

  console.log(pullRequests);

  if (!pullRequests) {
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
