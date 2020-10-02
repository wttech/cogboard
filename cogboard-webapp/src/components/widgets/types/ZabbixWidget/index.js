import React from 'react';
import SemiCircleProgress from '../../../SemiProgressBar';

const ZabbixWidget = props => {
  return (
    <>
      <div>ZabbixWidget</div>
      <SemiCircleProgress percentage={33} showPercentValue />
    </>
  );
};

export default ZabbixWidget;
