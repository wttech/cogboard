import React, { forwardRef, useRef } from 'react';
import { bool, number, object, string } from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled/macro';
import { useTheme } from '@material-ui/styles';
import { useDrag, useDrop } from 'react-dnd';

import { useDialogToggle } from '../hooks';
import { removeWidget, reorderWidgets } from '../actions/thunks';
import { ItemTypes } from '../constants';

import { Card, CardHeader, CardContent, MenuItem } from '@material-ui/core';
import AppDialog from './AppDialog';
import EditWidget from './EditWidget';
import MoreMenu from './MoreMenu';
import WidgetContent from './WidgetContent';

const mapStatusToColor = (status, theme) => theme.palette.status[status];

const StyledCard = styled(forwardRef(({
  status,
  columns,
  goNewLine,
  isDragging,
  rows,
  theme,
  ...other
}, ref) => <Card {...other} ref={ref} />))`
  background: ${({ status, theme }) => mapStatusToColor(status, theme)};
  box-shadow: none;
  cursor: move;
  display: flex;
  flex-direction: column;
  grid-column-start: ${({ goNewLine }) => goNewLine === true && 1};
  grid-column-end: span ${({ columns }) => columns};
  grid-row-end: span ${({ rows }) => rows};
  opacity: ${({ isDragging }) => isDragging && 0};
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`;

const Widget = ({ id, index }) => {
  const widgetData = useSelector(
    state => state.widgets.widgetsById[id],
    shallowEqual
  );
  const {
    id: widgetId,
    isUpdating,
    disabled,
    type,
    status,
    title,
    content,
    config: {
      columns,
      goNewLine,
      rows
    },
    ...widgetTypeData
  } = widgetData;
  const dispatch = useDispatch();
  const theme = useTheme();
  const [dialogOpened, openDialog, handleDialogClose] = useDialogToggle();
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.WIDGET, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const [, drop] = useDrop({
    accept: ItemTypes.WIDGET,
    drop(item) {
      if (!ref.current) {
        return;
      }

      const { id: sourceId, index: sourceIndex } = item;
      const targetIndex = index;

      if (sourceIndex === targetIndex) {
        return;
      }

      dispatch(reorderWidgets(sourceId, targetIndex));
    }
  });

  drag(drop(ref));

  const handleEditClick = (closeMenu) => () => {
    openDialog();
    closeMenu();
  };

  const handleDeleteClick = (closeMenu) => () => {
    dispatch(removeWidget(id));
    closeMenu();
  };

  return (
    <>
      <StyledCard
        status={status}
        columns={columns}
        goNewLine={goNewLine}
        rows={rows}
        theme={theme}
        isDragging={isDragging}
        ref={ref}
      >
        <CardHeader
          title={title}
          titleTypographyProps={
            {
              component: 'h3',
              variant: 'subtitle2',
              color: 'textPrimary'
            }
          }
          action={
            <MoreMenu>
              {closeMenu =>
                <>
                  <MenuItem onClick={handleEditClick(closeMenu)}>Edit</MenuItem>
                  <MenuItem onClick={handleDeleteClick(closeMenu)}>Delete</MenuItem>
                </>
              }
            </MoreMenu>
          }
        />
        <StyledCardContent>
          {!disabled ? <WidgetContent id={id} type={type} content={content} /> : 'Disabled'}
        </StyledCardContent>
      </StyledCard>
      <AppDialog
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title={`Edit ${title}`}
      >
        <EditWidget
          closeDialog={handleDialogClose}
          content={content}
          id={id}
          title={title}
          disabled={disabled}
          type={type}
          columns={columns}
          goNewLine={goNewLine}
          rows={rows}
          widgetTypeData={widgetTypeData}
        />
      </AppDialog>
    </>
  );
};

Widget.propTypes = {
  id: string.isRequired
};

StyledCard.propTypes = {
  columns: number.isRequired,
  goNewLine: bool.isRequired,
  rows: number.isRequired,
  status: string.isRequired,
  theme: object.isRequired
};

export default Widget;