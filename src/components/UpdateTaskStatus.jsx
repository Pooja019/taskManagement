import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Box, FormControl, Grid, LinearProgress, MenuItem, TextField, Typography } from '@mui/material';
import { updateStatus } from '../service/Api';
import { toast, ToastContainer } from 'react-toastify';

const statusOptions = ["Completed", "Pending", "In Progress", "Incomplete"]
export default function UpdateTaskStatus({ open, handleClose, task, refreshList }) {
    const navigate = useNavigate();
    const [statusBar, setStatusBar] = useState(0);
    const [status, setStatus] = useState("")

    useEffect(() => {
        if (task?.statusBar) {
            const value = parseInt(task.statusBar.replace('%', ''));
            setStatusBar(value);
        }
        if(task?.status){
            setStatus(task.status)
        }
    }, [task]);

    const handleProgressClick = () => {
        setStatusBar((prev) => (prev >= 100 ? 0 : prev + 10));
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await updateStatus({status, statusBar}, task.id)
        if(response.data){
            handleClose()
            toast.success("Task Status Updated")
            await refreshList()
        }
        console.log(response)
    }
    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Update Status</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>


                        <Grid container spacing={3}>

                            <Grid item size={{ xs: 12 }}>
                                <FormControl fullWidth required>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Select Status"
                                        name="status"
                                        value={status}
                                        onChange={(e) => { setStatus(e.target.value) }}
                                    >
                                        <MenuItem value="">Select Status</MenuItem>
                                        {statusOptions.map((option, index) => (
                                            <MenuItem key={index} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid item size={{ xs: 12 }} >
                                <Box onClick={handleProgressClick} sx={{ cursor: 'pointer' }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={statusBar}
                                        sx={{
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: '#f0f0f0',
                                            [`& .MuiLinearProgress-bar`]: {
                                                backgroundColor: '#ffa500',
                                            },
                                        }}
                                    />
                                </Box>
                                <Box sx={{ minWidth: 40, ml: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {statusBar}%
                                    </Typography>
                                </Box>
                            </Grid>



                        </Grid>


                    </DialogContent>
                    <DialogActions>
                        <Button type='submit' color="secondary">
                            Update
                        </Button>

                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
