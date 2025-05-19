import React, { useEffect, useState } from "react";
import {
	Typography,
	Box,
	Grid,
	Button,
	Paper,

} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { fetchTasks } from "../service/Api";
import { SITE_URI } from "../service/Config";
import FilterInputs from "./FilterInputs";
import TasksTable from "./TasksTable";

const TaskByAdmin = () => {
	const navigate = useNavigate();
	const [tasks, setTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [selectedProject, setSelectedProject] = useState("all");
	const [selectedStatus, setSelectedStatus] = useState("all");

	const getTasks = async () => {
		try {
			const data = await fetchTasks();

			const adminTasks = data.filter(
				(task) => task.assignedByAdminId !== null
			);

			setTasks(adminTasks);
			setFilteredTasks(adminTasks);
		} catch (err) {
			console.error("Error fetching tasks:", err);
		}
	};
	useEffect(() => {


		getTasks();
	}, []);


	const filterTasks = () => {
		let filtered = [...tasks];

		if (selectedProject && selectedProject !== "all") {
			filtered = filtered.filter(
				(task) => task.projectName === selectedProject
			);
		}
		if (selectedStatus && selectedStatus !== "all") {
			filtered = filtered.filter((task) => task.status === selectedStatus);
		}

		setFilteredTasks(filtered);
	};

	useEffect(() => {
		console.log("Filtering with:", selectedProject, selectedStatus);
		console.log("All tasks:", tasks);
		filterTasks();
	}, [selectedProject, selectedStatus]);



	return (
		<Box sx={{ minHeight: "100vh" }}>
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

			<Box sx={{ px: 3 }}>
				<Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
					<Typography variant="h5" mb={4} fontWeight={600} textAlign="center">
						Admin Tasks
					</Typography>

					<FilterInputs
						setSelectedProject={setSelectedProject}
						selectedProject={selectedProject}
						setSelectedStatus={setSelectedStatus}
						selectedStatus={selectedStatus}
						totalTasks={filteredTasks.length}
					/>

					<TasksTable tasks={filteredTasks} refreshList={getTasks} />
				</Paper>
			</Box>

		</Box>
	);
};

export default TaskByAdmin;
