import React from 'react';
import { func, object } from 'prop-types';
import styled from '@emotion/styled/macro';

import { useDialogToggle } from '../hooks';

import { Card, CardHeader, CardContent } from '@material-ui/core';
import AppDialog from './AppDialog';
import EditBoard from './EditBoard';

const StyledCard = styled(Card)`
  background-color: #5c6bc0;
`;

const BoardCard = ({ handleBoardClick, boardData, className }) => {
  const { id, title } = boardData;
  const [open, openDialog, handleDialogClose] = useDialogToggle();

  return (
    <div className={className}>
      <StyledCard onClick={handleBoardClick(id)}>
        <CardHeader
          title={title}
          titleTypographyProps={
            {
              component: 'h3',
              variant: 'subtitle2',
              color: 'textPrimary'
            }
          }
        />
        <CardContent>
        </CardContent>
      </StyledCard>
      <AppDialog
        handleDialogClose={handleDialogClose}
        open={open}
        title={`Edit ${title}`}
      >
        <EditBoard
          closeDialog={handleDialogClose}
          editData={boardData}
        />
      </AppDialog>
    </div>
  );
};

BoardCard.propTypes = {
  handleBoardClick: func.isRequired,
  boardData: object.isRequired
}

export default BoardCard;