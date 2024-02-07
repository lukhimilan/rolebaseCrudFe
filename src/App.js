import "./App.css";
import PrivateLayout from "./components/PrivateLayout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Routes, Route } from "react-router-dom";
import Unauthorized from "./components/Unauthorized";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider } from "./context/AuthProvider";
import ModeratorDashboard from "./components/ModeratorDashboard";
import ManageUser from "./components/ManageUser";
import UsersList from "./components/UsersList";
import EditUser from "./components/EditUser";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>

        <Routes>
          <Route path="/" element={<PrivateLayout />}>
            <Route element={<RequireAuth allowedRoles={["admin"]} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/manage-users" element={<ManageUser />} />
              <Route path="/edit-user" element={<EditUser />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={["moderator"]} />}>
              <Route
                path="/moderator-dashboard"
                element={<ModeratorDashboard />}
              />
              <Route path="/user-list" element={<UsersList />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={["user"]} />}>
              <Route path="/user-dashboard" index element={<UserDashboard />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
