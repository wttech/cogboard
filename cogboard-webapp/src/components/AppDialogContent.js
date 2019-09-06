import React from 'react';
import {func, string} from "prop-types";
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

const AppDialogContent = props => {
    const {content, labelOk, handleOk, labelCancel, handleCancel} = props;

    return (
        <>
            <DialogContentText id="confirmation-dialog-content">
                {content}
            </DialogContentText>
            <DialogActions>
                <Button onClick={handleOk} variant="contained" color="primary" autoFocus>
                    {labelOk}
                </Button>
                {handleCancel && <Button onClick={handleCancel} variant="outlined" color="primary">
                    {labelCancel}
                </Button>}
            </DialogActions>
        </>
    );
};

AppDialogContent.propTypes = {
    handleOk: func.isRequired,
    labelOk: string,
    labelCancel: string,
    content: string
};

AppDialogContent.defaultProps = {
    labelOk: 'OK',
    labelCancel: 'Cancel',
    content: ''
};

export default AppDialogContent;