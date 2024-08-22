import { FaHome, FaSalesforce } from "react-icons/fa";
import { FaCarTunnel } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const SellerMenu = () => {
  return (
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
  );
};

export default SellerMenu;
