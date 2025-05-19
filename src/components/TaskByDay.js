import React, { useEffect, useState } from "react";
import {
	Typography,
	Box,
	Grid,
	Button,
	Paper,

	TextField,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { fetchTasks } from "../service/Api";
import { SITE_URI } from "../service/Config";
import FilterInputs from "./FilterInputs";
import TasksTable from "./TasksTable";

const TaskByDay = () => {
	const navigate = useNavigate();

	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedProject, setSelectedProject] = useState("all");
	const [selectedStatus, setSelectedStatus] = useState("all");
	const [selectedDate, setSelectedDate] = useState(dayjs());


	const handleAdminTasksClick = () => {
		navigate(`${SITE_URI}/task-by-admin`);
	};

	const isTaskForToday = (task) => {
		const today = selectedDate.startOf("day");
		const start = dayjs(task.startDate).startOf("day");
		const end = dayjs(task.endDate).startOf("day");

		return (
			today.isSame(start) ||
			today.isSame(end) ||
			(today.isAfter(start) && today.isBefore(end))
		);
	};

	const loadTasks = async () => {
		try {
			const data = await fetchTasks();
			console.log("Fetched tasks:", data);
			setTasks(data);
		} catch (error) {
			console.error("Failed to load tasks", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {

		loadTasks();
	}, []);

	const filteredTasks = tasks
		.filter((task) => isTaskForToday(task))
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
			<Grid container spacing={2} justifyContent="center" sx={{ mt: 4, mb: 3 }}>
				<Grid item xs={12} sm={6} md={4}>
					<Button
						fullWidth
						variant="contained"
						sx={{ bgcolor: "#2f4f7f", color: "#fff" }}
						onClick={handleAdminTasksClick}
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

			<Box sx={{ px: 3, mt: 3 }}>
				<Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
					<Typography variant="h5" mb={4} fontWeight={600} textAlign="center">
						Today's Tasks
					</Typography>

					<FilterInputs
						setSelectedProject={setSelectedProject}
						selectedProject={selectedProject}
						setSelectedStatus={setSelectedStatus}
						selectedStatus={selectedStatus}
						totalTasks={filteredTasks.length}
					/>

					<TasksTable tasks={filteredTasks} refreshList={loadTasks} />
				</Paper>
			</Box>

		</Box>
	);
};

export default TaskByDay;
