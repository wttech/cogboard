import React from 'react';
import { array } from 'prop-types';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { StyledNoItemsInfo } from '../../../Widget/styled';

const PullRequestReminderWidget = ({ pullRequests }) => {
  return (
    <>
      {pullRequests.length > 0 ? (
        <h1>SOME REQUESTS</h1>
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
  pullRequests: array
};

PullRequestReminderWidget.defaultProps = {
  pullRequests: []
};

export default PullRequestReminderWidget;
