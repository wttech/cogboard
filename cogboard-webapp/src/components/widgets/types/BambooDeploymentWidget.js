import React from 'react';
import { string } from 'prop-types';
import { Caption, ClickableContentWrapper } from '../../styled';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../../selectors';

const BambooDeploymentWidget = ({ url, lifeCycleState, deploymentState }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return (
    <ClickableContentWrapper href={url} disabled={isAuthenticated}>
      <Caption>Deployment: {deploymentState}</Caption>
      <Caption>Lifecycle: {lifeCycleState}</Caption>
    </ClickableContentWrapper>
  );
};

BambooDeploymentWidget.propTypes = {
  url: string.isRequired,
  releaseName: string.isRequired,
  lifeCycleState: string.isRequired,
  deploymentState: string.isRequired
};

export default BambooDeploymentWidget;
