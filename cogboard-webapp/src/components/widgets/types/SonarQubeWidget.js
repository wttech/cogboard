import React from 'react';
import styled from '@emotion/styled/macro';

import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';

const StyledButton = styled(Button)`
  width: 100%
`;

const SonarQubeWidgetContent = props => {
  const {metrics = {}, id = '-', url = '#', version = '-', date = ''} = props;

  return (
    <>
      <Typography
        variant="caption"
      >
        <p>Version: {version}</p>
        <p>Timestamp: {date}</p>
        {Object.entries(metrics).map(([metric, val]) =>
          <p key={metric}>{metric.replace('_', ' ')}: {val}</p>
        )}
      </Typography>
      <StyledButton
        variant="outlined"
        href={url}
      >
        #{id}
      </StyledButton>
    </>
  );
};

export default SonarQubeWidgetContent;