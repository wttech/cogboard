import React, { useRef } from 'react';
import { string } from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/styles';
import { useDrag, useDrop } from 'react-dnd';

import { useToggle } from '../../hooks';
import {
  removeWidget,
  reorderWidgets,
  loadSettings
} from '../../actions/thunks';
import widgetTypes from '../widgets';
import { ItemTypes } from '../../constants';
import { getIsAuthenticated } from '../../selectors';
import { renderCardContent } from './helpers';

import { MenuItem } from '@material-ui/core';
import { StyledCard, StyledCardHeader } from './styled';
import AppDialog from '../AppDialog';
import EditWidget from '../EditWidget';
import MoreMenu from '../MoreMenu';
import ConfirmationDialog from '../ConfirmationDialog';
import StatusIcon from '../StatusIcon';
import { getWidgetStatus } from '../../utils/components';

const Widget = ({ id, index }) => {
  const widgetData = useSelector(
    ({ widgets }) => widgets.widgetsById[id],
    shallowEqual
  );
  const {
    id: widgetId,
    isUpdating,
    disabled,
    type,
    title,
    content,
    config: { columns, goNewLine, rows },
    ...widgetTypeData
  } = widgetData;
  const widgetStatus = getWidgetStatus(content);
  const showUpdateTime = widgetTypes[type]
    ? widgetTypes[type].showUpdateTime
    : false;
  const dispatch = useDispatch();
  const theme = useTheme();
  const [
    confirmationDialogOpened,
    openConfirmationDialog,
    closeConfirmationDialog
  ] = useToggle();
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

  const handleEditClick = closeMenu => () => {
    dispatch(loadSettings());
    openDialog();
    closeMenu();
  };

  const handleDeleteClick = closeMenu => () => {
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
        status={widgetStatus}
        columns={columns}
        goNewLine={goNewLine}
        rows={rows}
        theme={theme}
        isLoggedIn={isAuthenticated}
        isDragging={isDragging}
        isOver={isOver}
        ref={ref}
      >
        {(isAuthenticated || title !== '') && (
          <StyledCardHeader
            avatar={<StatusIcon status={widgetStatus} />}
            title={title}
            titleTypographyProps={{
              component: 'h3',
              variant: 'subtitle2',
              color: 'textPrimary'
            }}
            action={
              <MoreMenu>
                {closeMenu => (
                  <>
                    <MenuItem
                      onClick={handleEditClick(closeMenu)}
                      data-cy="widget-edit"
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={handleDeleteClick(closeMenu)}
                      data-cy="widget-delete"
                    >
                      Delete
                    </MenuItem>
                  </>
                )}
              </MoreMenu>
            }
          />
        )}
        {renderCardContent(content, showUpdateTime, disabled, id, type)}
      </StyledCard>
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title={`Edit ${title}`}
        componentId={id}
        data-cy="widget-edit-dialog"
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
