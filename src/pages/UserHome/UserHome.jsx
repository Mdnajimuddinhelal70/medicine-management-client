import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: paymentData, isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-history?email=${user?.email}`
      );
      // console.log(res.data);
      return res.data;
    },
  });

  const paymentHistory = paymentData?.paymentHistory || [];
  const paidTotal = paymentData?.paidTotal || 0;
  const pendingTotal = paymentData?.pendingTotal || 0;

  return (
    <div className="p-6 space-y-6 bg-white shadow-md rounded-lg">
      <Helmet>
        <title>Health || User Home</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-gray-800">Your Payment History</h2>

      <div className="flex justify-between mb-6">
        <div>
          <h4 className="text-xl font-semibold text-green-600">
            Paid Total: ${paidTotal}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold text-red-600">
            Pending Total: ${pendingTotal}
          </h4>
        </div>
      </div>

      {/* Display Payment History */}
      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse bg-gray-50 rounded-lg shadow-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">
                  Transaction ID
                </th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, idx) => (
                <tr
                  key={payment._id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-gray-200`}
                >
                  <td className="px-4 py-3 text-gray-800">
                    {payment.transactionId}
                  </td>
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
