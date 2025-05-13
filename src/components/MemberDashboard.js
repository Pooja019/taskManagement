import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { getTasks } from "../service/Api";

const MemberDashboard = () => {
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    const response = await getTasks(setLoading);
    // setTasks(response?.data);
    console.log(response?.data);
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    fetchTasks();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h5">
          🙌 Welcome, {user.email || "Team Member"}!
        </Typography>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        📝 Task List
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f0f0f0" }}>
              <TableCell>
                <b>Subject</b>
              </TableCell>
              <TableCell>
                <b>Description</b>
              </TableCell>
              <TableCell>
                <b>Project</b>
              </TableCell>
              <TableCell>
                <b>Priority</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
              <TableCell>
                <b>Progress</b>
              </TableCell>
              <TableCell>
                <b>Days</b>
              </TableCell>
              <TableCell>
                <b>Duration</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No tasks found.
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{task.subject}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.projectName}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.statusBar}</TableCell>
                  <TableCell>{task.days}</TableCell>
                  <TableCell>{task.durationInMinutes} mins</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MemberDashboard;
