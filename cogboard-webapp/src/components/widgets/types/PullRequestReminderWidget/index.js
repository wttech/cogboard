import React from 'react';
import PropTypes from 'prop-types';

import { formatPullRequestTitle } from './helpers.js';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { StyledNoItemsInfo } from '../../../Widget/styled';
import { PullRequestContainer, PullRequestLink } from './styled';

const PullRequestReminderWidget = ({ pullRequests }) => {
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
        pullRequests.map(({ id, title, html_url }) => (
          <PullRequestLink key={id} href={html_url} target="_blank">
            <PullRequestContainer>
              {formatPullRequestTitle(title)}
            </PullRequestContainer>
          </PullRequestLink>
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
