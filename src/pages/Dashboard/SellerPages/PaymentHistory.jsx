import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch payment history for the seller
  const { data: paymentHistory, isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?sellerEmail=${user?.email}`);
      console.log(res.data)
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      <table className="min-w-full mt-4">
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Buyer Email</th>
            <th>Price</th>
            <th>Transaction ID</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory?.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.mediName}</td>
              <td>{payment.buyerEmail}</td>
              <td>{payment.price}</td>
              <td>{payment.transactionId}</td>
              <td
                className={`${
                  payment.status === "paid" ? "text-green-500" : "text-red-500"
                }`}
              >
                {payment.status}
              </td>
              <td>{new Date(payment.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
