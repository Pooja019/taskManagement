import React, { useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useReactToPrint } from 'react-to-print';

export default function ImageDialog({ open, handleClose, img }) {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        documentTitle: 'Task Image',
        contentRef: componentRef,
    });

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>View Image</DialogTitle>
            <DialogContent>
                <Box
                    ref={componentRef}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="300px"
                >
                    <img
                        src={img}
                        alt="Task"
                        style={{ maxWidth: '100%', maxHeight: '300px' }}
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handlePrint()} color="primary" variant="contained">
                    Print Image
                </Button>
                <Button onClick={handleClose} color="secondary" variant="outlined">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
