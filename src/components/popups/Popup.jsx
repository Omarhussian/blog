import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';



const Popup = ({
    isOpen = false,
    onClose = () => { },
    children = [],
   
}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const maxWidth='lg';
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            maxWidth={maxWidth}
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            sx={{alignitems: 'center'}}
        >
            {children}
        </Dialog>
    );
}


export default Popup