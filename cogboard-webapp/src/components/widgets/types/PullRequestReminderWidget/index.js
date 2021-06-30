import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Link } from '@material-ui/core';

import { formatPullRequestTitle, preparePullRequestArray } from './helpers.js';

import { StyledNoItemsInfo } from '../../../Widget/styled';
import { StyledPullRequestContainer } from './styled';
import { StyledCircularProgress } from '../../../Loader/styled.js';

const PullRequestReminderWidget = ({ repositoryHub, pullRequests, id }) => {
  const widgets = useSelector(state => state.widgets);
  const isUpdating = widgets.widgetsById[id].isUpdating;

  let pullRequestsArr = preparePullRequestArray(repositoryHub, pullRequests);

  if (isUpdating) {
    return (
      <StyledNoItemsInfo>
        <StyledCircularProgress />
        <p>Loading pull requests...</p>
      </StyledNoItemsInfo>
    );
  } else if (!isUpdating && !pullRequests) {
    return (
      <StyledNoItemsInfo>
        <InfoOutlinedIcon fontSize="large" />
        <p>API rate limit exceeded!</p>
      </StyledNoItemsInfo>
    );
  }

  return (
    <>
      {pullRequestsArr.length > 0 ? (
        pullRequestsArr.map(({ id, title, url }, index) => (
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
