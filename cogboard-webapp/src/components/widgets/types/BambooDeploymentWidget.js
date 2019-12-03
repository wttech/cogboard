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
      <Caption>Deployment state: {deploymentState}</Caption>
      <Caption>Lifecycle state: {lifeCycleState}</Caption>
      <WidgetButton href={url}>{releaseName}</WidgetButton>
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
