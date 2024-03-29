import React, { useRef, useState } from 'react';
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
import { renderCardContent, dispatchEvent } from './helpers';
import { MenuItem } from '@material-ui/core';
import { StyledCard, StyledCollapse, WidgetMenuWrapper } from './styled';
import WidgetHeader from '../WidgetHeader';
import WidgetContent from '../WidgetContent';
import AppDialog from '../AppDialog';
import EditWidget from '../EditWidget';
import MoreMenu from '../MoreMenu';
import ConfirmationDialog from '../ConfirmationDialog';
import { getWidgetStatus, getWidgetUpdateTime } from '../../utils/components';
import ZabbixChart from '../ZabbixChart';
import WidgetFooter from '../WidgetFooter';

const selectors = {
  collapse: '[class*="MuiCollapse-container"]'
};

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
  const zabbixWidgetName = 'ZabbixWidget';
  const defaultExpandedContent = content ? content.isExpandedContent : false;
  const { expandContent: isExpandContent, isVertical } = widgetTypeData;
  let expandContent =
    type === zabbixWidgetName
      ? defaultExpandedContent
      : type === 'TextWidget' && isVertical
      ? false
      : isExpandContent;
  const widgetTypeConfig = widgetTypes[type] || widgetTypes['WhiteSpaceWidget'];
  const widgetStatus = disabled
    ? 'DISABLED'
    : getWidgetStatus(content, widgetTypeConfig);
  const widgetUpdateTimestamp = getWidgetUpdateTime(content, widgetTypeConfig);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [
    confirmationDialogOpened,
    openConfirmationDialog,
    closeConfirmationDialog
  ] = useToggle();
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();
  const [expanded, , , handleToggle] = useToggle();
  const ref = useRef(null);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const [isHoover, setHoover] = useState(false);
  const whiteSpaceInAuthenticatedMode =
    isAuthenticated && type === 'WhiteSpaceWidget';
  const isEmptyHeader = title === '';
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

  document.addEventListener('CloseAllWidgets', event => {
    if (event.detail === id) {
      return;
    }
    if (!expanded) {
      return;
    }
    handleToggle();
  });

  const closeWidgets = widgetId => {
    dispatchEvent('CloseAllWidgets', widgetId);
  };

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

  const handleCollapseScrollIntoView = () => {
    const { top, height } = ref.current
      .querySelectorAll(selectors.collapse)[0]
      .getBoundingClientRect();
    const collapseVerticalOffset = top + height;

    if (collapseVerticalOffset > window.innerHeight) {
      window.scrollTo({
        top: collapseVerticalOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <StyledCard
        showShadow={expanded}
        showBorder={whiteSpaceInAuthenticatedMode}
        status={widgetStatus}
        columns={columns}
        goNewLine={goNewLine}
        rows={rows}
        theme={theme}
        isLoggedIn={isAuthenticated}
        isDragging={isDragging}
        isOver={isOver}
        isVertical={isVertical}
        ref={ref}
        type={type}
        expanded={expanded}
        onMouseEnter={() => setHoover(true)}
        onMouseLeave={() => setHoover(false)}
      >
        {(isAuthenticated || widgetStatus !== 'NONE' || title !== '') && (
          <WidgetHeader
            isEmptyHeader={isEmptyHeader}
            title={title}
            titleTypographyProps={{
              component: 'h3',
              variant: 'subtitle2',
              color: 'textPrimary'
            }}
            action={
              isAuthenticated &&
              isHoover && (
                <WidgetMenuWrapper status={widgetStatus} theme={theme}>
                  <MoreMenu
                    color={
                      whiteSpaceInAuthenticatedMode ? 'primary' : 'default'
                    }
                  >
                    {closeMenu => [
                      <MenuItem
                        key={`${type}-moreMenu-editItem`}
                        onClick={handleEditClick(closeMenu)}
                        data-cy="widget-edit"
                      >
                        Edit
                      </MenuItem>,
                      <MenuItem
                        key={`${type}-moreMenu-deleteItem`}
                        onClick={handleDeleteClick(closeMenu)}
                        data-cy="widget-delete"
                      >
                        Delete
                      </MenuItem>
                    ]}
                  </MoreMenu>
                </WidgetMenuWrapper>
              )
            }
          />
        )}
        {renderCardContent(
          content,
          disabled,
          id,
          type,
          widgetStatus,
          expandContent,
          expanded,
          handleToggle
        )}
        <WidgetFooter
          updateTimestamp={widgetUpdateTimestamp}
          expanded={expanded}
          handleToggle={handleToggle}
          content={content}
          expandContent={expandContent}
          closeWidgets={closeWidgets}
          id={id}
        />
        {expandContent && (
          <StyledCollapse
            isExpanded={expanded}
            type={type}
            status={widgetStatus}
            theme={theme}
            isDragging={isDragging}
            in={expanded}
            timeout="auto"
            onEntered={() => handleCollapseScrollIntoView()}
            unmountOnExit
          >
            {type === zabbixWidgetName ? (
              <ZabbixChart id={id} content={content} />
            ) : (
              <WidgetContent id={id} type={type} content={content} />
            )}
          </StyledCollapse>
        )}
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
