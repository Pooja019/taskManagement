import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Paper,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import SendIcon from "@mui/icons-material/Send";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AppsIcon from "@mui/icons-material/Apps";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const email = user?.email || "User";

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const iconHoverStyle = {
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.2)",
      transform: "scale(1.15)",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    },
    transition: "all 0.3s ease",
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#eaeff1" }}>
      {/* AppBar */}
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

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ mt: "45px" }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Profile Content */}
      <Container sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Avatar sx={{ width: 120, height: 120 }} />
          </Box>

          <Grid container spacing={4}>
            {/* Row 1 */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Institute Name"
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>

            {/* Row 2 */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Department"
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Join Date"
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>

            {/* Row 3 */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Address"
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone"
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>

            {/* Row 4 (optional extra) */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Project Name"
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Branch"
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Footer */}
      <Box sx={{ py: 2.5, textAlign: "center", bgcolor: "#f1f1f1" }}>
        <Typography variant="body2" sx={{ color: "#444", fontWeight: 500 }}>
          © Software Designed By PJSOFTECH Pvt. Ltd. | All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Profile;
