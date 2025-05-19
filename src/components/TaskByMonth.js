import React, { useEffect, useState } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Box,
	Grid,
	Button,
	Paper,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	LinearProgress,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Menu,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import FilterInputs from "./FilterInputs";
import { fetchTasks } from "../service/Api";
import { SITE_URI } from "../service/Config";
import MemberDetailsDialog from "./MemberDetailsDialog";
import TasksTable from "./TasksTable";


const TaskByMonth = () => {
	const navigate = useNavigate();
	const [selectedProject, setSelectedProject] = useState("all");
	const [selectedStatus, setSelectedStatus] = useState("all");

	const [tasks, setTasks] = useState([])

	const [open, setOpen] = useState(false)
	const [taskDetails, setTaskDetails] = useState([])

	const getTasks = async() => {
		const response = await fetchTasks()
		console.log(response)
		setTasks(response)
	}

	useEffect(() => {

		getTasks()
	}, [])

	const filteredTasks = tasks
		.filter((task) => {
			const projectMatch =
				selectedProject === "all" || task.projectName === selectedProject;
			const statusMatch =
				selectedStatus === "all" ||
				task.status === selectedStatus;
			return projectMatch && statusMatch;
		});


	return (
		<Box sx={{ minHeight: "100vh" }}>

			{/* Filter Buttons */}
			<Grid container spacing={2} justifyContent="center" sx={{ mt: 4, mb: 5 }}>
				<Grid item xs={12} sm={6} md={4}>
					<Button
						fullWidth
						variant="contained"
						sx={{ bgcolor: "#2f4f7f", color: "#fff" }}
						onClick={() => navigate(`${SITE_URI}/task-by-admin`)}
					>
						Admin Tasks
					</Button>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<Button
						fullWidth
						variant="contained"
						sx={{ bgcolor: "#2f4f7f", color: "#fff" }}
						onClick={() => navigate(`${SITE_URI}/teamleader-tasks`)}
					>
						TeamLeader Tasks
					</Button>
				</Grid>
			</Grid>

			{/* Filters and Task Table */}
			<Box sx={{ px: 3, mt: 4 }}>
				<Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
					<Typography variant="h5" mb={4} fontWeight={600} textAlign="center">
						All Tasks
					</Typography>

					<FilterInputs
						setSelectedProject={setSelectedProject}
						selectedProject={selectedProject}
						setSelectedStatus={setSelectedStatus}
						selectedStatus={selectedStatus}
						totalTasks={tasks.length}
					/>

					<TasksTable tasks={filteredTasks} refreshList={getTasks} />

				</Paper>
			</Box>
			<MemberDetailsDialog open={open} handleClose={() => setOpen(false)} task={taskDetails} />

		</Box>
	);
};

export default TaskByMonth;
