import React from 'react';

import { StyledCardContent } from './styled';
import ErrorMessage from '../ErrorMessage';
import WidgetContent from '../WidgetContent';
import LastUpdate from '../LastUpdate';

export const mapStatusToColor = (status, theme) => theme.palette.status[status];

export const renderCardContent = (
  content,
  updateTimestamp,
  disabled,
  id,
  type
) => {
  return (
    <StyledCardContent>
      {content && content.errorMessage ? (
        <ErrorMessage {...content} />
      ) : !disabled ? (
        <WidgetContent id={id} type={type} content={content} />
      ) : (
        'Disabled'
      )}
      {updateTimestamp && (
        <LastUpdate
          lastUpdateTime={new Date(updateTimestamp).toLocaleString()}
        />
      )}
    </StyledCardContent>
  );
};
