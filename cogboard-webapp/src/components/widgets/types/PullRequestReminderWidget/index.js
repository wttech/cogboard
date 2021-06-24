import React from 'react';
import PropTypes from 'prop-types';

import { formatPullRequestTitle } from './helpers.js';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { StyledNoItemsInfo } from '../../../Widget/styled';
import { PullRequestContainer, PullRequestLink } from './styled';

const testPRs = [
  {
    id: 0,
    title: 'Test title',
    html_url: 'google.pl'
  },
  {
    id: 1,
    title: 'Test title',
    html_url: 'google.pl'
  },
  {
    id: 2,
    title: 'Test title',
    html_url: 'google.pl'
  }
];

const PullRequestReminderWidget = ({ pullRequests }) => {
  if (!pullRequests) {
    pullRequests = testPRs;
    // return (
    //   <StyledNoItemsInfo>
    //     <InfoOutlinedIcon fontSize="large" />
    //       <p>API rate limit exceeded!</p>
    //   </StyledNoItemsInfo>
    // )
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
