import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: stats } = useQuery({
    queryKey: ["seller-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/seller-stats");
      // console.log(res.data);
      return res.data;
    },
  });
  return (
    <div>
      <Helmet>
        <title>Health || Seller Home</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">
       Here are your revenue total paid and total pending
      </h1>
      <div>
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Total Revenue</div>
            <div className="stat-value">${stats?.revenue}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Total Paid</div>
            <div className="stat-value text-secondary">{stats?.totalPaid}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Total Pending</div>
            <div className="stat-value">{stats?.totalPending}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
