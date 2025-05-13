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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Menu,
} from "@mui/material";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import SendIcon from "@mui/icons-material/Send";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AppsIcon from "@mui/icons-material/Apps";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { fetchTasks } from "../service/Api";

const TaskByAdmin = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const username = user?.email || "User";

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate("/profile");
  };

  const iconHoverStyle = {
    "&:hover": {
      color: "#ffd700",
    },
  };

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

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

    // Debugging filtered tasks
    console.log("Filtered Tasks:", filtered); // Check the filtered tasks here

    setFilteredTasks(filtered);
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        console.log("Fetched Tasks:", data); // Debug: Check fetched data

        const adminEmail = user?.email;

        const adminTasks = data.filter(
          (task) => task.assignedByAdminId === user.id
        );
        console.log("Admin Tasks:", adminTasks); // Debug: Check admin filtered tasks

        setTasks(adminTasks);
        setFilteredTasks(adminTasks); // Update filtered tasks
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    getTasks();
  }, [user?.id]);

  useEffect(() => {
    filterTasks();
  }, [selectedProject, selectedStatus]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#eaeff1" }}>
      <AppBar position="static" sx={{ bgcolor: "#2f4f7f" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ flex: 1, textAlign: "center" }}>
            Welcome! {username}
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
            <IconButton
              color="inherit"
              onClick={handleMenuClick}
              sx={iconHoverStyle}
            >
              <AccountCircleIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ mt: "45px" }}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} justifyContent="center" sx={{ mt: 4, mb: 5 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            fullWidth
            variant="contained"
            sx={{ bgcolor: "#2f4f7f", color: "#fff" }}
            onClick={() => navigate("/task-by-admin")}
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

      <Box sx={{ px: 3 }}>
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
          <Typography variant="h5" mb={4} fontWeight={600} textAlign="center">
            Admin Tasks
          </Typography>

          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="project-select-label">
                  Select Project
                </InputLabel>
                <Select
                  labelId="project-select-label"
                  value={selectedProject}
                  onChange={handleProjectChange}
                >
                  <MenuItem value="all">All Projects</MenuItem>
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
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="inProgress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="incomplete">Incomplete</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

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
                    <TableCell>Description</TableCell>
                    <TableCell>Status Bar</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} align="center">
                        No tasks available.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>{task.id}</TableCell>
                        <TableCell>{task.projectName}</TableCell>
                        <TableCell>{task.subject}</TableCell>
                        <TableCell>{task.startDate}</TableCell>
                        <TableCell>{task.endDate}</TableCell>
                        <TableCell>
                          {task.imageUrl ? (
                            <img src={task.imageUrl} alt="Task" width={50} />
                          ) : (
                            "No Image"
                          )}
                        </TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell>
                          <LinearProgress
                            variant="determinate"
                            value={
                              parseInt(task.statusBar?.replace("%", "")) || 50
                            }
                          />
                        </TableCell>
                        <TableCell>{task.status}</TableCell>
                        <TableCell>
                          <Button variant="contained" size="small">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ py: 2.5, mt: 5, textAlign: "center", bgcolor: "#f1f1f1" }}>
        <Typography variant="body2" sx={{ color: "#444", fontWeight: 500 }}>
          © Software Designed By PJSOFTECH Pvt. Ltd. | All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default TaskByAdmin;
