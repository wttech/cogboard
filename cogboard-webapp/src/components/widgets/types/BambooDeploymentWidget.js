import React from 'react';
import { string } from 'prop-types';
import { Caption, WidgetButton } from '../../styled';

const BambooDeploymentWidget = ({
  url,
  releaseName,
  lifeCycleState,
  deploymentState
}) => {
  return (
    <>
      <Caption>Artifact: {releaseName}</Caption>
      <Caption>Deployment state: {deploymentState}</Caption>
      <Caption>Lifecycle state: {lifeCycleState}</Caption>
      <WidgetButton href={url}>Deployment logs</WidgetButton>
    </>
  );
};

BambooDeploymentWidget.propTypes = {
  url: string.isRequired,
  releaseName: string.isRequired,
  lifeCycleState: string.isRequired,
  deploymentState: string.isRequired
};

export default BambooDeploymentWidget;
