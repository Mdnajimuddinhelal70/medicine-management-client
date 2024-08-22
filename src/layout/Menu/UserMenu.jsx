import { FaHome, FaSalesforce, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
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
  );
};

export default UserMenu;
