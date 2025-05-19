import React, { useState, useEffect } from "react";
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
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	LinearProgress,
	Stack,
	Menu,
} from "@mui/material";
import {
	DashboardCustomize as DashboardCustomizeIcon,
	Send as SendIcon,
	EventAvailable as EventAvailableIcon,
	Apps as AppsIcon,
	Logout as LogoutIcon,
	AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { API_URL, SITE_URI } from "../service/Config";
import { fetchTasks } from "../service/Api";
import FilterInputs from "./FilterInputs";
import MemberDetailsDialog from "./MemberDetailsDialog";
import TasksTable from "./TasksTable";

const TeamLeaderTask = () => {
	const navigate = useNavigate();

	const [tasks, setTasks] = useState([]);
	const [selectedProject, setSelectedProject] = useState("");
	const [selectedStatus, setSelectedStatus] = useState("");
	const [selectedDate, setSelectedDate] = useState(null);
	const totalTasks = tasks.length;

	const [filteredTasks, setFilteredTasks] = useState([]);
	const [open, setOpen] = useState(false)
	const [taskDetails, setTaskDetails] = useState([])

	const getTasks = async () => {
		try {
			const data = await fetchTasks();

			const leaderTasks = data.filter(
				(task) => task.assignedByLeaderId !== null
			);

			setTasks(leaderTasks);
			setFilteredTasks(leaderTasks);
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


	const buttonStyle = {
		bgcolor: "#2f4f7f",
		color: "#fff",
		"&:hover": { bgcolor: "#244169" },
	};

	const handleView = (task) => {
		setOpen(true)
		setTaskDetails(task)
	}


	return (
		<Box sx={{ minHeight: "100vh" }}>
			<Grid container spacing={2} justifyContent="center" sx={{ mt: 4, mb: 5 }}>
				<Grid item xs={12} sm={6} md={4}>
					<Button
						fullWidth
						variant="contained"
						sx={buttonStyle}
						onClick={() => navigate(`${SITE_URI}/task-by-admin`)}
					>
						Admin Tasks
					</Button>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<Button
						fullWidth
						variant="contained"
						sx={buttonStyle}
						onClick={() => navigate(`${SITE_URI}/teamleader-tasks`)}
					>
						TeamLeader Tasks
					</Button>
				</Grid>
			</Grid>

			<Box sx={{ px: 3, mt: 4 }}>
				<Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
					<Typography variant="h5" mb={4} fontWeight={600} textAlign="center">
						Team Leader Tasks
					</Typography>

					<FilterInputs
						setSelectedProject={setSelectedProject}
						selectedProject={selectedProject}
						setSelectedStatus={setSelectedStatus}
						selectedStatus={selectedStatus}
						totalTasks={totalTasks}
					/>

					<TasksTable tasks={filteredTasks} refreshList={getTasks} />
				</Paper>
			</Box>
			<MemberDetailsDialog open={open} handleClose={() => setOpen(false)} task={taskDetails} />

		</Box>
	);
};

export default TeamLeaderTask;
