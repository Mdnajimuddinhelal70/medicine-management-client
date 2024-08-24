import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch payment history
  const { data: paymentHistory, isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history?email=${user?.email}`);
      console.log(res.data)
      return res.data;
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Payment History</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full mt-4">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory?.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.transactionId}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserHome;
