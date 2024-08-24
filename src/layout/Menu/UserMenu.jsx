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
    </>
  );
};

export default UserMenu;
