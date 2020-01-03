import React from 'react';
import LastUpdate from './LastUpdate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { StyledIconButton } from './Widget/styled';

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
    <div className="cardFootWrapper">
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
    </div>
  );
};

export default WidgetFooter;
