import React from 'react';

import LastUpdate from './LastUpdate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { StyledIconButton, StyledCardFooterWrapper } from './Widget/styled';

const WidgetFooter = ({
  updateTimestamp,
  content,
  expanded,
  handleToggle,
  expandContent,
  closeWidgets,
  id
}) => {
  if (!expandContent && !updateTimestamp) {
    return null;
  }

  const validateDate = (date) => {
    return isNaN(new Date(date).getTime());
  }

  return (
    <StyledCardFooterWrapper>
      {updateTimestamp && (
        <LastUpdate
          lastUpdateTime={new Date(updateTimestamp).toLocaleString()}
          invalid={validateDate(updateTimestamp)}
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
    </StyledCardFooterWrapper>
  );
};

export default WidgetFooter;
