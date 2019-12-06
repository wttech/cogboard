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
  showUpdateTime,
  disabled,
  id,
  type,
  status,
  expandContent,
  expanded,
  handleExpandClick
) => {
  const handleClick = () => {
    console.log(content);
  };

  return (
    <StyledCardContent>
      {content && content.errorMessage ? (
        <ErrorMessage {...content} />
      ) : !disabled && !expandContent ? (
        <WidgetContent id={id} type={type} content={content} />
      ) : expandContent ? (
        <StyledStatusIconButton onClick={handleClick}>
          <StatusIcon status={status} size="large" />
        </StyledStatusIconButton>
      ) : (
        'Disabled'
      )}
      <div className="cardFootWrapper">
        {showUpdateTime && (
          <LastUpdate lastUpdateTime={new Date().toLocaleString()} />
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
