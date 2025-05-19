import React, { useEffect, useState } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	IconButton,
	Menu,
	MenuItem,
} from "@mui/material";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import SendIcon from "@mui/icons-material/Send";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AppsIcon from "@mui/icons-material/Apps";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";
import { SITE_URI } from "../service/Config";
import { getMember } from "../service/Api";



const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const isActive = (path) => location.pathname === `${SITE_URI}${path}`;

	const [user, setUser] = useState()

	useEffect(()=>{
		async function getMemberDetails() {
			const response = await getMember()
			console.log(response.data)
			setUser(response?.data)
		}
		getMemberDetails()
	}, [])


	const iconHoverStyle = {
		"&:hover": {
			backgroundColor: "rgba(255,255,255,0.2)", // Lighter background color on hover
			transform: "scale(1.15)", // Slightly increase the scale
			boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Adding subtle shadow for effect
			Padding: "5px"
		},
		transition: "all 0.3s ease", // Smooth transition for all changes
	};

	const handleLogout = () => {
		sessionStorage.clear();
		navigate(`${SITE_URI}`);
	};

	

	const [anchorEl, setAnchorEl] = useState(null);
	const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
	const handleMenuClose = () => setAnchorEl(null);

	const handleProfile = () => {
		handleMenuClose()
		navigate(`${SITE_URI}/profile`);
	};
	return (
		<>
			<AppBar
				position="fixed"
				sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1,
					backgroundColor: "#2980B9",
				}}
			>
				<Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					{/* Left: Logo and Company Name */}
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Box
							component="img"
							src="/logo.jpg"
							alt="Logo"
							sx={{ width: 40, height: 40, mr: 1 }}
						/>
						<Typography
							variant="h6"
							noWrap
							sx={{
								color: "#fff",
								fontSize: "1rem",
								fontWeight: "bold",
							}}
						>
							PJSOFTTECH
						</Typography>
					</Box>

					{/* Center: Project Title */}
					<Box sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
						<Typography
							variant="h5"
							noWrap
							sx={{
								color: "#fff",
								fontWeight: "bold",
								textAlign: "center"
							}}
						>
							Welcome! {user?.name}
						</Typography>
					</Box>

					{/* Right: Placeholder for future actions */}
					<Box >
						<Box sx={{ display: "flex", gap: 1.5 }}>
							<IconButton
								color="inherit"
								onClick={() => navigate(`${SITE_URI}/dashboard`)}
								sx={{
									backgroundColor: isActive("/dashboard") ? "#fff" : "none",
									color: isActive("/dashboard") ? "#000" : "inherit",
									borderRadius: "50%",
									...iconHoverStyle,
								}}
							>
								<DashboardCustomizeIcon/>
							</IconButton>
							<IconButton color="inherit" sx={{
									backgroundColor: isActive("/send") ? "#fff" : "none",
									color: isActive("/send") ? "#000" : "inherit",
									borderRadius: "50%",
									...iconHoverStyle,
								}}>
								<SendIcon  />
							</IconButton>
							<IconButton
								color="inherit"
								onClick={() => navigate(`${SITE_URI}/task-by-day`)}
								sx={{
									backgroundColor: isActive("/task-by-day") ? "#fff" : "none",
									color: isActive("/task-by-day") ? "#000" : "inherit",
									borderRadius: "50%",
									...iconHoverStyle,
								}}
							>
								<EventAvailableIcon />
							</IconButton>
							<IconButton
								color="inherit"
								onClick={() => navigate(`${SITE_URI}/tasks`)}
								sx={{
									backgroundColor: isActive("/tasks") ? "#fff" : "none",
									color: isActive("/tasks") ? "#000" : "inherit",
									borderRadius: "50%",
									...iconHoverStyle,
								}}
							>
								<AppsIcon  />
							</IconButton>

							<IconButton
								color="inherit"
								backgroundColor={isActive("/profile") ? "white" : "transparent"}

								onClick={handleMenuClick}
								sx={iconHoverStyle}
							>
								<AccountCircleIcon  />
							</IconButton>
						</Box>
						<Menu
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleMenuClose}
						>
							<MenuItem onClick={handleProfile}>Profile</MenuItem>
							<MenuItem onClick={handleLogout}>Logout</MenuItem>
						</Menu>

					</Box>

				</Toolbar>
			</AppBar>

		</>
	);
};

export default Header;
