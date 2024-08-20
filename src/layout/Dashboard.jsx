import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-pink-600 text-white shadow-md">
        <div className="p-4 text-center font-bold text-xl">Admin Dashboard</div>
        <nav className="mt-6">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/dashboard/home"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${
                    isActive ? "bg-gray-500" : "hover:bg-gray-300"
                  }`
                }
              >
                Admin Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manageUsers"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${
                    isActive ? "bg-gray-500" : "hover:bg-gray-300"
                  }`
                }
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manageCategory"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${
                    isActive ? "bg-gray-500" : "hover:bg-gray-300"
                  }`
                }
              >
                Manage Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/salesReport"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${
                    isActive ? "bg-gray-500" : "hover:bg-gray-300"
                  }`
                }
              >
                Sales Report
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manageBanner"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${
                    isActive ? "bg-gray-500" : "hover:bg-gray-300"
                  }`
                }
              >
                Manage Banner Advertise
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
