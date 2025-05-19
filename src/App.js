// App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/Login";
import TaskByDay from "./components/TaskByDay";
import TaskByMonth from "./components/TaskByMonth";
import { Login, ProtectedRoute } from "./components/ProtectedRoute";
import TaskByAdmin from "./components/TaskByAdmin";
import TeamLeaderTask from "./components/TeamLeaderTask";
import Profile from "./components/Profile";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./Layout/theme";
import { SITE_URI } from "./service/Config";
import Layout from "./Layout/Layout";
import Dashboard from "./components/Dashboard";

// export const SITE_URI = "/project-management/user";

function AppContent() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to={SITE_URI} replace />} />

			<Route path={`${SITE_URI}/*`} element={<ProtectedRoute> <Layout />	</ProtectedRoute>}>
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="task-by-day" element={<TaskByDay />} />
				<Route path="tasks" element={<TaskByMonth />} />
				<Route path="task-by-admin" element={<TaskByAdmin />} />
				<Route path="teamleader-tasks" element={<TeamLeaderTask />} />
				<Route
					path="profile"
					element={<Profile data={JSON.parse(sessionStorage.getItem("user"))} />}
				/>
			</Route>

			<Route path={`${SITE_URI}`} element={<Login><LoginPage /></Login>} />
		</Routes>
	);
}


const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<CssBaseline />
				<AppContent />
			</Router>
		</ThemeProvider>
	)
}

export default App;
