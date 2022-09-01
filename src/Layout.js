import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import ManageUser from "./components/Admin/Content/ManageUser";
import Dashboard from "./components/Admin/Content/DashBoard";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="users" element={<User />} />
        </Route>
        <Route path="/admins" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUser />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Layout;
