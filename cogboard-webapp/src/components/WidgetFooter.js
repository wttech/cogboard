import React from 'react';
import LastUpdate from './LastUpdate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { StyledIconButton } from './Widget/styled';

const WidgetFooter = props => {
  const {
    updateTimestamp,
    content,
    expanded,
    handleToggle,
    expandContent
  } = props;
  return (
    <div className="cardFootWrapper">
      {updateTimestamp && (
        <LastUpdate
          lastUpdateTime={new Date(updateTimestamp).toLocaleString()}
        />
      )}
      {expandContent && !content.errorMessage && (
        <StyledIconButton
          isExpanded={expanded}
          onClick={handleToggle}
          aria-expanded={expandContent}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </StyledIconButton>
      )}
    </div>
  );
};

export default WidgetFooter;
