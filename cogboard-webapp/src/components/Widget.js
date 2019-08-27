import React from 'react';
import { bool, number, object, string } from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled/macro';
import { useTheme } from '@material-ui/styles';

import { useDialogToggle } from '../hooks';
import { deleteWidget } from '../actions/actionCreators';

import { Card, CardHeader, CardContent, MenuItem } from '@material-ui/core';
import AppDialog from './AppDialog';
import EditWidget from './EditWidget';
import MoreMenu from './MoreMenu';
import WidgetContent from './WidgetContent';

const mapStatusToColor = (status, theme) => theme.palette.status[status];

const StyledCard = styled(({
  status,
  columns,
  goNewLine,
  theme,
  ...other
}) => <Card {...other} />)`
  background: ${({ status, theme }) => mapStatusToColor(status, theme)};
  box-shadow: none;
  grid-column-start: ${({ goNewLine }) => goNewLine === true && 1};
  grid-column-end: span ${({ columns }) => columns};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledCardContent = styled(CardContent)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Widget = ({ id }) => {
  const currentBoardId = useSelector(({ ui }) => ui.currentBoard);
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
      goNewLine
    },
    ...widgetTypeData
  } = widgetData;
  const dispatch = useDispatch();
  const theme = useTheme();
  const [dialogOpened, openDialog, handleDialogClose] = useDialogToggle();

  const handleEditClick = (closeMenu) => () => {
    openDialog();
    closeMenu();
  };

  const handleDeleteClick = (closeMenu) => () => {
    dispatch(deleteWidget(id, currentBoardId));
    closeMenu();
  };

  return (
    <>
      <StyledCard
        status={status}
        columns={columns}
        goNewLine={goNewLine}
        theme={theme}
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
          {!disabled ? <WidgetContent type={type} content={content} /> : 'Disabled'}
        </StyledCardContent>
      </StyledCard>
      <AppDialog
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title={`Edit ${title}`}
      >
        <EditWidget
          closeDialog={handleDialogClose}
          id={id}
          title={title}
          disabled={disabled}
          type={type}
          columns={columns}
          goNewLine={goNewLine}
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
  status: string.isRequired,
  theme: object.isRequired
}

export default Widget;