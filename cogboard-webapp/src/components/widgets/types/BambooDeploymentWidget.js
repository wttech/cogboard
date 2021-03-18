import React from 'react';
import { string } from 'prop-types';
import { Caption, ClickableContentWrapper } from '../../styled';

const BambooDeploymentWidget = ({ url, lifeCycleState, deploymentState }) => {
  return (
    <ClickableContentWrapper href={url}>
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
