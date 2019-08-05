import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
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

const StyledCard = styled(({ status, columns, goNewLine, theme, ...other }) => <Card {...other} />)`
  background: ${({ status, theme }) => mapStatusToColor(status, theme)};
  box-shadow: none;
  grid-column-start: ${({ goNewLine }) => goNewLine === true && 1};
  grid-column-end: span ${({ columns }) => columns};
`;

const Widget = ({ widgetData, currentBoard }) => {
  const { id, disabled, type, status, title, content = {}, config = {} } = widgetData;
  const { columns = 1, goNewLine = false } = config;
  const [dialogOpened, openDialog, handleDialogClose] = useDialogToggle();
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleEditClick = (closeMenu) => () => {
    openDialog();
    closeMenu();
  };

  const handleDeleteClick = (closeMenu) => () => {
    dispatch(deleteWidget(id, currentBoard));
    closeMenu();
  }

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
        <CardContent>
          {!disabled ? <WidgetContent type={type} content={content} /> : 'Disabled'}
        </CardContent>
      </StyledCard>
      <AppDialog
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title={`Edit ${title}`}
      >
        <EditWidget
          closeDialog={handleDialogClose}
          editData={widgetData}
        />
      </AppDialog>
    </>
  );
};

Widget.propTypes = {
  goNewLine: PropTypes.bool
};

export default Widget;