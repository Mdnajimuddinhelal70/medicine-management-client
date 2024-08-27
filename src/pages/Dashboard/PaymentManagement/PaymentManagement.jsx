import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentManagement = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch payments data
  const { data: payments, isLoading, refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/payments");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  const handleAcceptPayment = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this payment as paid?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark as paid!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/payments/${id}`, { status: "paid" }) // Update payment status to "paid"
          .then(() => {
            Swal.fire("Updated!", "The payment has been marked as paid.", "success");
            refetch(); // Refresh data after successful update
          })
          .catch((error) => {
            Swal.fire("Error!", "Something went wrong. Please try again.", "error");
          });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/payments/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "The payment has been deleted.", "success");
            refetch();
          })
          .catch((error) => {
            Swal.fire("Error!", "Something went wrong. Please try again.", "error");
          });
      }
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Payments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-800 text-white text-left">
              <th className="py-3 px-4 font-semibold">Email</th>
              <th className="py-3 px-4 font-semibold">Amount</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr
                key={payment._id}
                className={`${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border-b hover:bg-gray-100`}
              >
                <td className="py-3 px-4 text-gray-700">{payment.buyerEmail}</td>
                <td className="py-3 px-4 text-gray-700 font-semibold">
                  ${payment.price}
                </td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    payment.status === "paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {payment.status.charAt(0).toUpperCase() +
                    payment.status.slice(1)}
                </td>
                <td className="py-3 px-4 flex gap-4">
                  {payment.status === "pending" && (
                    <button
                      onClick={() => handleAcceptPayment(payment._id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                      Accept Payment
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(payment._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManagement;
