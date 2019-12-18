import React from 'react';

import { StyledCardContent, StyledIconButton } from './styled';
import ErrorMessage from '../ErrorMessage';
import WidgetContent from '../WidgetContent';
import LastUpdate from '../LastUpdate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WidgetTypeIcon from '../WidgetTypeIcon';

export const mapStatusToColor = (status, theme) => theme.palette.status[status];

export const getWidgetOverflow = type =>
  type !== 'TextWidget' ? 'visible' : 'hidden';

export const renderCardContent = (
  content,
  updateTimestamp,
  disabled,
  id,
  type,
  status,
  expandContent,
  expanded,
  handleToggle
) => {
  const WidgetFooter = () => {
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

  return (
    <StyledCardContent>
      {content && content.errorMessage ? (
        <ErrorMessage {...content} />
      ) : !disabled && !expandContent ? (
        <WidgetContent id={id} type={type} content={content} />
      ) : expandContent ? (
        <WidgetTypeIcon
          type={type}
          status={status}
          content={content}
        ></WidgetTypeIcon>
      ) : (
        'Disabled'
      )}
      <WidgetFooter></WidgetFooter>
    </StyledCardContent>
  );
};
