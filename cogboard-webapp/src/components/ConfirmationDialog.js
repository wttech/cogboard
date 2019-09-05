import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmationDialog = props => {
    const { open, labelOk, handleOk, labelCancel, handleCancel, title, content } = props;

    return (
            <Dialog
                open={open}
                onClose={handleCancel}
                aria-labelledby="confirmation-dialog-title"
                aria-describedby="confirmation-dialog-content"
            >
                <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirmation-dialog-content">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOk} color="primary" autoFocus>
                        {labelOk}
                    </Button>
                    <Button onClick={handleCancel} color="primary">
                        {labelCancel}
                    </Button>
                </DialogActions>
            </Dialog>
    );
};

export default ConfirmationDialog;