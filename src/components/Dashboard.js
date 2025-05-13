import React, { useState } from "react";
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

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const email = user?.email || "User";

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const statusData = [
    { label: "In Progress", color: "#42a5f5", count: 0 },
    { label: "Completed", color: "#ef5350", count: 0 },
    { label: "Incomplete", color: "#ffca28", count: 0 },
    { label: "Pending", color: "#29b6f6", count: 0 },
  ];

  const pieData = [
    { name: "In Progress", value: 2 },
    { name: "Pending", value: 3 },
    { name: "Completed", value: 1 },
    { name: "Incomplete", value: 0 },
  ];
  const barData = [
    { period: "Last 7", count: 9 },
    { period: "Last 30", count: 9 },
    { period: "Last 365", count: 0 },
  ];
  const COLORS = ["#42a5f5", "#ffca28", "#ef5350", "#90caf9"];

  const iconHoverStyle = {
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.2)", // Lighter background color on hover
      transform: "scale(1.15)", // Slightly increase the scale
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Adding subtle shadow for effect
    },
    transition: "all 0.3s ease", // Smooth transition for all changes
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#eaeff1" }}>
      <AppBar position="static" sx={{ bgcolor: "#2f4f7f" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ flex: 1, textAlign: "center" }}>
            Welcome! {email}
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton
              color="inherit"
              onClick={() => navigate("/dashboard")}
              sx={iconHoverStyle}
            >
              <DashboardCustomizeIcon />
            </IconButton>
            <IconButton color="inherit" sx={iconHoverStyle}>
              <SendIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => navigate("/task-by-day")}
              sx={iconHoverStyle}
            >
              <EventAvailableIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => navigate("/task-by-month")}
              sx={iconHoverStyle}
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
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ mt: "45px" }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

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
          <Typography variant="h6" align="center" color="text.secondary" mb={4}>
            Logged in as: <strong>{email}</strong>
          </Typography>

          <Grid container spacing={3} justifyContent="center" mb={5}>
            {statusData.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.label}>
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
            <Grid item xs={12} md={6}>
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

            <Grid item xs={12} md={6}>
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

      <Box sx={{ py: 2.5, textAlign: "center", bgcolor: "#f1f1f1" }}>
        <Typography variant="body2" sx={{ color: "#444", fontWeight: 500 }}>
          © Software Designed By PJSOFTECH Pvt. Ltd. | All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
