import { useContext } from "react";
import { FaHome, FaUsers, FaBoxOpen, FaMoneyBillWave, FaChartLine, FaBullhorn } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const AdminMenu = () => {
  const {logOut} = useContext(AuthContext)
  const navigate = useNavigate()
   const handleLogout = () => {
     logOut()
     navigate('/login')
   }
  return (
    <>
      <li>
        <NavLink
          to="/dashboard/home"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md flex items-center gap-2 ${
              isActive ? "bg-gray-500" : "hover:bg-gray-300"
            }`
          }
        >
          <FaHome />
          Admin Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manageUsers"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md ${
              isActive ? "bg-gray-500" : "hover:bg-gray-300"
            }`
          }
        >
          <FaUsers />
          Manage Users
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manageCategory"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md ${
              isActive ? "bg-gray-500" : "hover:bg-gray-300"
            }`
          }
        >
          <FaBoxOpen />
          Manage Category
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/paymentManagement"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md ${
              isActive ? "bg-gray-500" : "hover:bg-gray-300"
            }`
          }
        >
          <FaMoneyBillWave />
          Payment Management
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/salesReport"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md ${
              isActive ? "bg-gray-500" : "hover:bg-gray-300"
            }`
          }
        >
          <FaChartLine />
          Sales Report
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manageBanner"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md ${
              isActive ? "bg-gray-500" : "hover:bg-gray-300"
            }`
          }
        >
          <FaBullhorn />
          Manage Banner Advertise
        </NavLink>
      </li>

      <div className="divider divider-primary"></div>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md flex items-center gap-2 ${
              isActive ? "bg-gray-500" : "hover:bg-gray-300"
            }`
          }
        >
          <NavLink/>
           Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shopPage"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md flex items-center gap-2 ${
              isActive ? "bg-gray-500" : "hover:bg-gray-300"
            }`
          }
        >
          <NavLink />
          Shop Page
        </NavLink>
      </li>
      <div className="">
        <button
        onClick={handleLogout}
        className="bg-fuchsia-300-500 text-white px-4 py-2 rounded-md hover:bg-pink-950">
         Log Out
        </button>
      </div>
    </>
  );
};

export default AdminMenu;
