import React from 'react';

import {
  StyledCardContent,
  StyledIconButton,
  StyledStatusIconButton
} from './styled';
import ErrorMessage from '../ErrorMessage';
import WidgetContent from '../WidgetContent';
import LastUpdate from '../LastUpdate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StatusIcon from '../StatusIcon';

export const mapStatusToColor = (status, theme) => theme.palette.status[status];

export const renderCardContent = (
  content,
  updateTimestamp,
  disabled,
  id,
  type,
  status,
  expandContent,
  expanded,
  handleExpandClick
) => {
  const handleClick = status => {
    console.log(status);
  };

  return (
    <StyledCardContent>
      {content && content.errorMessage ? (
        <ErrorMessage {...content} />
      ) : !disabled && !expandContent ? (
        <WidgetContent id={id} type={type} content={content} />
      ) : expandContent ? (
        <StyledStatusIconButton onClick={handleClick(status)}>
          <StatusIcon status={status} size="large" />
        </StyledStatusIconButton>
      ) : (
        'Disabled'
      )}
      <div className="cardFootWrapper">
        {updateTimestamp && (
          <LastUpdate
            lastUpdateTime={new Date(updateTimestamp).toLocaleString()}
          />
        )}
        {expandContent && !content.errorMessage && (
          <StyledIconButton
            isExpanded={expanded}
            onClick={handleExpandClick}
            aria-expanded={expandContent}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </StyledIconButton>
        )}
      </div>
    </StyledCardContent>
  );
};
