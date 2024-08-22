import { FaHome, FaSalesforce, FaUser } from "react-icons/fa";
import { FaCarTunnel } from "react-icons/fa6";
import { PiFlagBanner } from "react-icons/pi";
import { NavLink } from "react-router-dom";


const AdminMenu = () => {
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
                    <FaUser />
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
                    <FaCarTunnel />
                    Manage Category
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
                    <FaSalesforce />
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
                    <PiFlagBanner />
                    Manage Banner Advertise
                  </NavLink>
                </li>
              </>
    );
};

export default AdminMenu;