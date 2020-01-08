import React from 'react';
import styled from '@emotion/styled/macro';

import LastUpdate from './LastUpdate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { StyledIconButton } from './Widget/styled';

const CardFooterWrapper = styled.div`
  height: 48px;
`;

const WidgetFooter = ({
  updateTimestamp,
  content,
  expanded,
  handleToggle,
  expandContent,
  closeWidgets,
  id
}) => {
  return (
    <CardFooterWrapper className="cardFootWrapper">
      {updateTimestamp && (
        <LastUpdate
          lastUpdateTime={new Date(updateTimestamp).toLocaleString()}
        />
      )}
      {expandContent && !content.errorMessage && (
        <StyledIconButton
          isExpanded={expanded}
          onClick={() => {
            handleToggle();
            closeWidgets(id);
          }}
          aria-expanded={expandContent}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </StyledIconButton>
      )}
    </CardFooterWrapper>
  );
};

export default WidgetFooter;
