import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: paymentHistory, isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?sellerEmail=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-blue-900">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 rounded-md">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Buyer Email</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Transaction ID</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory?.map((payment) => (
              <tr key={payment._id} className="bg-white border-b hover:bg-gray-100">
                <td className="py-3 px-4">{payment.buyerEmail}</td>
                <td className="py-3 px-4">${payment.price.toFixed(2)}</td>
                <td className="py-3 px-4">{payment.transactionId}</td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    payment.status === "paid" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {payment.status}
                </td>
                <td className="py-3 px-4">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
