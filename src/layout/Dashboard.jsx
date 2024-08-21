import { FaHome, FaSalesforce, FaUser } from "react-icons/fa";
import { FaCarTunnel } from "react-icons/fa6";
import { PiFlagBanner } from "react-icons/pi";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  // Role-based checks (তুমি এই ডাটা API বা Context থেকে আনতে পারো)
  const isAdmin = true;
  const isSeller = false;
  const isUser = false;

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-pink-600 text-white shadow-md">
        <div className="p-4 text-center font-bold text-xl">
          {isAdmin && "Admin Dashboard"}
          {isSeller && "Seller Dashboard"}
          {isUser && "User Dashboard"}
        </div>
        <nav className="mt-6">
          <ul className="space-y-4">
            {/* Admin Dashboard */}
            {isAdmin && (
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
            )}

            {/* Seller Dashboard */}
            {isSeller && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/sellerHome"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-md flex items-center gap-2 ${
                        isActive ? "bg-gray-500" : "hover:bg-gray-300"
                      }`
                    }
                  >
                    <FaHome />
                    Seller Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageProducts"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-md ${
                        isActive ? "bg-gray-500" : "hover:bg-gray-300"
                      }`
                    }
                  >
                    <FaCarTunnel />
                    Manage Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/orders"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-md ${
                        isActive ? "bg-gray-500" : "hover:bg-gray-300"
                      }`
                    }
                  >
                    <FaSalesforce />
                    View Orders
                  </NavLink>
                </li>
              </>
            )}

            {/* User Dashboard */}
            {isUser && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/userHome"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-md flex items-center gap-2 ${
                        isActive ? "bg-gray-500" : "hover:bg-gray-300"
                      }`
                    }
                  >
                    <FaHome />
                    User Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myOrders"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-md ${
                        isActive ? "bg-gray-500" : "hover:bg-gray-300"
                      }`
                    }
                  >
                    <FaSalesforce />
                    My Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myProfile"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-md ${
                        isActive ? "bg-gray-500" : "hover:bg-gray-300"
                      }`
                    }
                  >
                    <FaUser />
                    My Profile
                  </NavLink>
                </li>
              </>
            )}
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
