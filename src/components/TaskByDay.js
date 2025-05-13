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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  MenuItem,
  TextField,
  Menu,
} from "@mui/material";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import SendIcon from "@mui/icons-material/Send";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AppsIcon from "@mui/icons-material/Apps";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { DatePicker } from "@mui/lab";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { fetchTasks } from "../service/Api";

const TaskByDay = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const email = user?.email || "User";

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleAdminTasksClick = () => {
    navigate("/task-by-admin");
  };

  // ✅ Correct function to check if today's date is between startDate and endDate
  const isTaskForToday = (task) => {
    const today = selectedDate.startOf("day"); // remove time part
    const start = dayjs(task.startDate).startOf("day");
    const end = dayjs(task.endDate).startOf("day");

    return (
      today.isSame(start) ||
      today.isSame(end) ||
      (today.isAfter(start) && today.isBefore(end))
    );
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks(email);
        console.log("Fetched tasks:", data);
        setTasks(data);
      } catch (error) {
        console.error("Failed to load tasks", error);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, [email]);

  const filteredTasks = tasks
    .filter((task) => isTaskForToday(task)) // ✅ Now checking correctly
    .filter((task) => {
      const projectMatch =
        selectedProject === "all" || task.projectName === selectedProject;
      const statusMatch =
        selectedStatus === "all" ||
        task.status?.toLowerCase() === selectedStatus;
      return projectMatch && statusMatch;
    });

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#eaeff1" }}>
      <AppBar position="static" sx={{ bgcolor: "#2f4f7f" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ flex: 1, textAlign: "center" }}>
            Welcome! {email}
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton color="inherit" onClick={() => navigate("/dashboard")}>
              <DashboardCustomizeIcon />
            </IconButton>
            <IconButton color="inherit">
              <SendIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => navigate("/task-by-day")}
            >
              <EventAvailableIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => navigate("/task-by-month")}
            >
              <AppsIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleMenuClick}>
              <AccountCircleIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

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
            onClick={() => navigate("/teamleader-tasks")}
          >
            TeamLeader Tasks
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ px: 3, mt: 3 }}>
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
          <Typography variant="h5" mb={4} fontWeight={600} textAlign="center">
            Today's Tasks - Task By Day
          </Typography>

          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Select Project</InputLabel>
                <Select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  label="Select Project"
                >
                  <MenuItem value="all">All Projects</MenuItem>
                  <MenuItem value="Project1">Project1</MenuItem>
                  <MenuItem value="salarySystem">
                    Salary System Software
                  </MenuItem>
                  <MenuItem value="test">Test Projects</MenuItem>
                  <MenuItem value="pm">Project Management App</MenuItem>
                  <MenuItem value="vb">Vanrakshak Book</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="complete">Complete</MenuItem>
                  <MenuItem value="in-progress">In-Progress</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                renderInput={(props) => <TextField {...props} fullWidth />}
              />
            </Grid>
          </Grid>

          <Box sx={{ overflowX: "auto" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1200 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Task Id</TableCell>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Days</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <LinearProgress />
                      </TableCell>
                    </TableRow>
                  ) : filteredTasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No tasks found for the selected date and filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>{task.id}</TableCell>
                        <TableCell>{task.projectName}</TableCell>
                        <TableCell>{task.subject}</TableCell>
                        <TableCell>{task.days}</TableCell>
                        <TableCell>{task.status}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ py: 2.5, textAlign: "center", bgcolor: "#f1f1f1" }}>
        <Typography variant="body2" sx={{ color: "#444", fontWeight: 500 }}>
          © Software Designed By PJSOFTECH Pvt. Ltd. | All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default TaskByDay;
