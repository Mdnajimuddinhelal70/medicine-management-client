import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: paymentHistory, isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-6 space-y-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800">Your Payment History</h2>
      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse bg-gray-50 rounded-lg shadow-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Transaction ID</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory?.map((payment, idx) => (
                <tr
                  key={payment._id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-gray-200`}
                >
                  <td className="px-4 py-3 text-gray-800">{payment.transactionId}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      payment.status === "paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserHome;
