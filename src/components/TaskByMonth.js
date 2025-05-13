import React, { useState } from "react";
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

const TaskByMonth = () => {
  const navigate = useNavigate();

  const userRaw = sessionStorage.getItem("user");
  const user =
    typeof userRaw === "string" && userRaw.startsWith("{")
      ? JSON.parse(userRaw)
      : { email: userRaw };
  const userEmail = user?.email || "USER";

  const [reload, setReload] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const tasks = []; // Replace with actual task data
  const totalTasks = tasks.length;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#eaeff1" }}>
      <AppBar position="static" sx={{ bgcolor: "#2f4f7f" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ flex: 1, textAlign: "center" }}>
            Welcome! {userEmail}
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

      {/* Filter Buttons */}
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

      {/* Filters and Task Table */}
      <Box sx={{ px: 3, mt: 4 }}>
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
          <Typography variant="h5" mb={4} fontWeight={600} textAlign="center">
            Tasks for the Month
          </Typography>

          {/* Horizontal Filters */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            mb={4}
            alignItems="center"
            justifyContent="space-between"
          >
            <FormControl fullWidth size="small">
              <InputLabel>Select Project</InputLabel>
              <Select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                label="Select Project"
              >
                <MenuItem value="" disabled>
                  -- Select Project --
                </MenuItem>
                <MenuItem value="all">All Projects</MenuItem>
                <MenuItem value="salarySystem">Salary System</MenuItem>
                <MenuItem value="test">Test Projects</MenuItem>
                <MenuItem value="pm">Project Management</MenuItem>
                <MenuItem value="vb">Vanrakshak Book</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="inProgress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="incomplete">Incomplete</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                format="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
              />
            </LocalizationProvider>
          </Stack>

          {/* Total Tasks */}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: "#2f4f7f",
              textAlign: "right",
            }}
          >
            Total Tasks Found: {totalTasks}
          </Typography>

          {/* Task Table */}
          <Box sx={{ overflowX: "auto" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1600 }} stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Task Id</TableCell>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Days</TableCell>
                    <TableCell>Hours</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                    <TableCell>Time Taken</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Status Bar</TableCell>
                    <TableCell>Status</TableCell>
            
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={14} align="center">
                        No tasks available this month.
                      </TableCell>
                    </TableRow>
                  ) : (
                    tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>{task.id}</TableCell>
                        <TableCell>{task.projectName}</TableCell>
                        <TableCell>{task.subject}</TableCell>
                        <TableCell>{task.days}</TableCell>
                        <TableCell>{task.hours}</TableCell>
                        <TableCell>{task.endDate}</TableCell>
                        <TableCell>{task.startTime}</TableCell>
                        <TableCell>{task.endTime}</TableCell>
                        <TableCell>{task.timeTaken}</TableCell>
                        <TableCell>
                          <img src={task.image} alt="Task" width={50} />
                        </TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell>
                          <LinearProgress
                            variant="determinate"
                            value={task.progress || 50}
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

export default TaskByMonth;
