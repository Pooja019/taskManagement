import React, { useEffect, useState } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Box,
	Grid,
	Paper,
	Container,
	Menu,
	MenuItem,
} from "@mui/material";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import SendIcon from "@mui/icons-material/Send";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AppsIcon from "@mui/icons-material/Apps";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
} from "recharts";
import { fetchTasks } from "../service/Api";

const Dashboard = () => {
	const navigate = useNavigate();
	const [completed, setCompleted] = useState(0)
	const [pending, setPending] = useState(0)
	const [inProgress, setInProgress] = useState(0)
	const [inComplete, setInComplete] = useState(0)
	const [tasks, setTasks] = useState([])


	useEffect(() => {
		async function getTasks() {
			const response = await fetchTasks()
			setTasks(response)
			const allTasks = response || []
			const completedTasks = allTasks.filter(task => task.status === "Completed").length;
			setCompleted(completedTasks)

			const inProgressTasks = allTasks.filter(task => task.status === "In Progress").length;
			setInProgress(inProgressTasks)

			const pendingTasks = allTasks.filter(task => task.status === "Pending").length;
			setPending(pendingTasks)

			const incompleteTasks = allTasks.filter(task => task.status === "Incomplete").length;
			setInComplete(incompleteTasks)

			console.log(pendingTasks)
		}
		getTasks()
	}, [])

	const filterTasksByDays = (tasks, days) => {
		const today = new Date();
		const pastDate = new Date();
		pastDate.setDate(today.getDate() - days);

		return tasks.filter(task => {
			const taskDate = new Date(task.startDate);
			return taskDate >= pastDate && taskDate <= today;
		}).length;
	};


	const statusData = [
		{ label: "In Progress", color: "#42a5f5", count: inProgress },
		{ label: "Completed", color: "#ef5350", count: completed },
		{ label: "Incomplete", color: "#ffca28", count: inComplete },
		{ label: "Pending", color: "#29b6f6", count: pending },
	];

	const pieData = [
		{ name: "In Progress", value: inProgress },
		
		{ name: "Completed", value: completed },
		{ name: "Incomplete", value: inComplete },
		{ name: "Pending", value: pending },
	];
	const barData = [
		{ period: "Today's", count: filterTasksByDays(tasks,0) },
		{ period: "Last 7", count: filterTasksByDays(tasks,7) },
		{ period: "Last 30", count: filterTasksByDays(tasks,30) },
		{ period: "Last 365", count: filterTasksByDays(tasks,365) },
		{ period: "Total", count: filterTasksByDays(tasks,tasks.length) },
	];
	const COLORS = ["#42a5f5", "#ef5350", "#ffca28", "#29b6f6"];

	return (
		<Box sx={{ minHeight: "100vh" }}>
			<Container maxWidth="xl" sx={{ mt: 4, mb: 2 }}>
				<Box
					sx={{
						p: 3,
						m: "0 1%",
						bgcolor: "#fff",
						borderRadius: 3,
						boxShadow: 4,
						width: "98%",
						minHeight: "85vh",
					}}
				>
					<Typography variant="h4" mb={2} align="center" fontWeight={600}>
						Dashboard Overview
					</Typography>

					<Grid container spacing={3} justifyContent="center" mb={5}>
						{statusData.map((item) => (
							<Grid item key={item.label}>
								<Paper
									elevation={3}
									sx={{
										p: 3,
										bgcolor: item.color,
										color: "#fff",
										borderRadius: 2,
										textAlign: "center",
									}}
								>
									<Typography variant="h6">{item.label}</Typography>
									<Typography variant="h5">{item.count}</Typography>
								</Paper>
							</Grid>
						))}
					</Grid>

					<Grid container spacing={5}>
						<Grid item size={{ xs: 12, sm: 6 }}>
							<Typography variant="h6" mb={2}>
								All Tasks By Period
							</Typography>
							<BarChart width={450} height={300} data={barData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="period" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="count" fill="#42a5f5" />
							</BarChart>
						</Grid>

						<Grid item size={{ xs: 12, sm: 6 }}>
							<Typography variant="h6" mb={2}>
								All Tasks By Status
							</Typography>
							<PieChart width={450} height={300}>
								<Pie
									data={pieData}
									cx={220}
									cy={150}
									labelLine={false}
									label={({ name, value }) => `${name}: ${value}`}
									outerRadius={100}
									fill="#8884d8"
									dataKey="value"
								>
									{pieData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
						</Grid>
					</Grid>
				</Box>
			</Container>

		</Box>
	);
};

export default Dashboard;
