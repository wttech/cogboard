import React from 'react';

import { StyledCardContent, StyledIconButton } from './styled';
import ErrorMessage from '../ErrorMessage';
import WidgetContent from '../WidgetContent';
import LastUpdate from '../LastUpdate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const mapStatusToColor = (status, theme) => theme.palette.status[status];

export const renderCardContent = (
  content,
  showUpdateTime,
  disabled,
  id,
  type,
  isExpanded,
  expanded,
  handleExpandClick
) => {
  return (
    <StyledCardContent>
      {content && content.errorMessage ? (
        <ErrorMessage {...content} />
      ) : !disabled && !isExpanded ? (
        <WidgetContent id={id} type={type} content={content} />
      ) : (
        'Disabled'
      )}
      <div className="cardFootWrapper">
        {showUpdateTime && (
          <LastUpdate lastUpdateTime={new Date().toLocaleString()} />
        )}
        {isExpanded && (
          <StyledIconButton
            isExpanded={expanded}
            onClick={handleExpandClick}
            aria-expanded={isExpanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </StyledIconButton>
        )}
      </div>
    </StyledCardContent>
  );
};
