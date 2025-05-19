import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { use, useEffect, useState } from 'react'
import { getProjects } from '../service/Api';
import { useLocation } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const FilterInputs = ({
    setSelectedProject,
    selectedProject,
    setSelectedStatus,
    selectedStatus,
    totalTasks
}) => {

    const location = useLocation();
    console.log(location.pathname)
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        async function fetchProjects() {
            const response = await getProjects();
            const projectList = response?.data?.map(p => p.projectName) || [];
            setProjects(projectList);
        }
        fetchProjects();
    }, []);


    return (
        <Grid container spacing={3} mb={4}>
            <Grid item size={{ xs: 12, md: 2.5 }}>
                <FormControl fullWidth >
                    <InputLabel>Project</InputLabel>
                    <Select
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                        label="Project"
                    >
                        <MenuItem value="all">All Projects</MenuItem>
                        {
                            projects.map((project, index) => (
                                <MenuItem key={index} value={project}>
                                    {project}
                                </MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>
            </Grid>

            <Grid item size={{ xs: 12, md: 2.5 }}>
                <FormControl fullWidth >
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        label="Status"
                    >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Incomplete">Incomplete</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item size={{ xs: 12, md: 2 }} sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "right" 
            }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 600,
                        color: "#2f4f7f",
                        textAlign: "center",
                    }}
                >
                    Total Tasks: {totalTasks}
                </Typography>
            </Grid>
        </Grid>
    );
};


export default FilterInputs