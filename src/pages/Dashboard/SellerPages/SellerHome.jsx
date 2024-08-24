import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const SellerHome = () => {
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { data: stats } = useQuery({
        queryKey: ["seller-stats", user?.email],
        queryFn: async () => {
          const res = await axiosPublic.get(`/seller-stats?email=${user?.email}`);
          return res.data;
        },
      });
      
  
    return (
      <div>
        <h2>Total Sales Revenue</h2>
        <p>Paid Total: ${stats?.totalPaidRevenue}</p>
        <p>Pending Total: ${stats?.totalPendingRevenue}</p>
      </div>
    );
  };
  export default SellerHome;