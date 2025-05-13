// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login";
import DashboardPage from "./components/Dashboard";
import TaskByDay from "./components/TaskByDay";
import TaskByMonth from "./components/TaskByMonth";
import { Login, ProtectedRoute } from "./components/ProtectedRoute";
import TaskByAdmin from "./components/TaskByAdmin";
import TeamLeaderTask from "./components/TeamLeaderTask";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={
            <Login>
              <LoginPage />
            </Login>
          }
        />

        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* TaskByDay Route */}
        <Route
          path="/task-by-day"
          element={
            <ProtectedRoute>
              <TaskByDay />
            </ProtectedRoute>
          }
        />

        {/* TaskByMonth Route */}
        <Route
          path="/task-by-month"
          element={
            <ProtectedRoute>
              <TaskByMonth />
            </ProtectedRoute>
          }
        />

        {/* TaskByAdmin Route */}
        <Route
          path="/task-by-admin"
          element={
            <ProtectedRoute>
              <TaskByAdmin />
            </ProtectedRoute>
          }
        />

        {/* TeamLeaderTask Route */}
        <Route
          path="/teamleader-tasks"
          element={
            <ProtectedRoute>
              <TeamLeaderTask />
            </ProtectedRoute>
          }
        />

        {/* Profile Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              {/* FIXED: Passed mock user data to Profile component */}
              <Profile data={JSON.parse(sessionStorage.getItem("user"))} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
