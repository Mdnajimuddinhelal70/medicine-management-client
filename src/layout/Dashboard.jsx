import { Outlet } from "react-router-dom";

import useRole from "../hooks/useRole";
import AdminMenu from "./Menu/AdminMenu";
import SellerMenu from "./Menu/SellerMenu";
import UserMenu from "./Menu/UserMenu";

const Dashboard = () => {
  const [role] = useRole();
  console.log(role);

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-zinc-400 text-white shadow-md">
        <nav className="mt-6">
          <ul className="space-y-4">
            {role === "admin" && <AdminMenu />}

            {role === "seller" && <SellerMenu />}

            {role === "user" && <UserMenu />}
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
