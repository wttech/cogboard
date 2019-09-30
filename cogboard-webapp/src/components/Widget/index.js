import React, { useRef } from 'react';
import { string } from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/styles';
import { useDrag, useDrop } from 'react-dnd';

import { useToggle } from '../../hooks';
import { removeWidget, reorderWidgets } from '../../actions/thunks';
import widgetTypes from "../widgets";
import { ItemTypes } from '../../constants';
import { getIsAuthenticated } from '../../selectors';

import { MenuItem } from '@material-ui/core';
import { StyledCard, StyledCardHeader, StyledCardContent } from './styled';
import AppDialog from '../AppDialog';
import EditWidget from '../EditWidget';
import MoreMenu from '../MoreMenu';
import WidgetContent from '../WidgetContent';
import LastUpdate from "../LastUpdate";
import ConfirmationDialog from "../ConfirmationDialog";

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
  const showUpdateTime = widgetTypes[type] ? widgetTypes[type].showUpdateTime : false;
  const dispatch = useDispatch();
  const theme = useTheme();
  const [confirmationDialogOpened, openConfirmationDialog, closeConfirmationDialog] = useToggle();
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();
  const ref = useRef(null);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.WIDGET, id, index },
    canDrag: isAuthenticated,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.WIDGET,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const { id: sourceId, index: sourceIndex } = item;
      const targetIndex = index;

      if (sourceIndex === targetIndex) {
        return;
      }

      const { left, right } = ref.current.getBoundingClientRect();
      const dropTargetMiddleX = right - (right - left) / 2;
      const { x: dragSourceMouseX } = monitor.getClientOffset();

      if (
        (sourceIndex < targetIndex && dragSourceMouseX < dropTargetMiddleX) ||
        (sourceIndex > targetIndex && dragSourceMouseX > dropTargetMiddleX)
      ) {
        return;
      }

      dispatch(reorderWidgets(sourceId, targetIndex));
      item.index = targetIndex;
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      dropResult: monitor.getSourceClientOffset()
    })
  });

  drag(drop(ref));

  const handleEditClick = (closeMenu) => () => {
    openDialog();
    closeMenu();
  };

  const handleDeleteClick = (closeMenu) => () => {
    openConfirmationDialog();
    closeMenu();
  };

  const deleteWidget = () => {
    dispatch(removeWidget(id));
    closeConfirmationDialog();
  };

  return (
    <>
      <StyledCard
        status={status}
        columns={columns}
        goNewLine={goNewLine}
        rows={rows}
        theme={theme}
        isLoggedIn={isAuthenticated}
        isDragging={isDragging}
        isOver={isOver}
        ref={ref}
      >
        <StyledCardHeader
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
          {showUpdateTime && <LastUpdate lastUpdateTime={new Date().toLocaleString()} />}
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
      <ConfirmationDialog
        open={confirmationDialogOpened}
        title={`Delete ${title}`}
        content={`Are you sure you want to delete ${title}?`}
        handleOk={deleteWidget}
        labelOk="Delete"
        handleCancel={closeConfirmationDialog}
      />
    </>
  );
};

Widget.propTypes = {
  id: string.isRequired
};

export default Widget;