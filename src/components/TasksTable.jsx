import { Box, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import InfoIcon from '@mui/icons-material/Info';
import MemberDetailsDialog from './MemberDetailsDialog';
import EditIcon from '@mui/icons-material/Edit';
import UpdateTaskStatus from './UpdateTaskStatus';
import { ToastContainer } from 'react-toastify';
import ImageDialog from './ImageDialog';
import { Link } from 'react-router-dom';


const TasksTable = ({ tasks, refreshList }) => {
    const [open, setOpen] = useState(false)
    const [openImg, setOpenImg] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [taskDetails, setTaskDetails] = useState([])
    const [taskImg, setTaskImg] = useState("")
    const handleView = (task) => {
        setOpen(true)
        setTaskDetails(task)
    }

    const handleEdit = (task) => {
        setTaskDetails(task)
        setOpenEdit(true)
    }

    const handleImg = (img) => {
        setTaskImg(img)
        setOpenImg(true)
    }

    return (
        <>
            <Box sx={{ overflowX: "auto" }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1000 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Task Id</TableCell>
                                <TableCell>Project Name</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Status Bar</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={10} align="center">
                                        No tasks available.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                tasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell>{task.id}</TableCell>
                                        <TableCell>{task.projectName}</TableCell>
                                        <TableCell>{task.subject}</TableCell>
                                        <TableCell>{task.startDate}</TableCell>
                                        <TableCell>{task.endDate}</TableCell>

                                        <TableCell>
                                            {task.imageUrl ? (
                                                <Typography
                                                    component="span"
                                                    onClick={() => handleImg(task.imageUrl)}
                                                    sx={{
                                                        color: 'primary.main',
                                                        fontWeight: 'medium',
                                                        cursor: 'pointer',
                                                        textTransform: 'uppercase',
                                                        '&:hover': {
                                                            color: 'secondary.main',
                                                        },
                                                    }}
                                                >
                                                    View Image
                                                </Typography>
                                            ) : (
                                                "N/A"
                                            )}
                                        </TableCell>



                                        <TableCell>
                                            <LinearProgress
                                                variant="determinate"
                                                value={
                                                    parseInt(task.statusBar?.replace("%", "")) || 50
                                                }
                                            />
                                            {task.statusBar} %
                                        </TableCell>
                                        <TableCell>{task.status}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleView(task)} sx={{ color: "#2980B9" }} title="View Task">
                                                <InfoIcon />
                                            </IconButton>

                                            <IconButton onClick={() => handleEdit(task)} sx={{ color: "#2f4f7f " }} title="Edit Status">
                                                <EditIcon />
                                            </IconButton>


                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <ToastContainer position="top-right" autoClose={3000} />
            <ImageDialog open={openImg} handleClose={() => { setOpenImg(false) }} img={taskImg} />
            <MemberDetailsDialog open={open} handleClose={() => setOpen(false)} task={taskDetails} />
            <UpdateTaskStatus open={openEdit} handleClose={() => setOpenEdit(false)} task={taskDetails} refreshList={refreshList} />
        </>
    )
}

export default TasksTable