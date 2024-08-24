import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: payments, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/payments");
      return data;
    }
  });


  const acceptPaymentMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/payments/${id}`, { status: "paid" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("payments");
      Swal.fire("Success", "Payment status updated to paid", "success");
    }
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="gap-3">
      <h2 className="text-xl font-bold mb-4">All Payments</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Email</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.email}</td>
              <td>${payment.price}</td>
              <td>{payment.status}</td>
              <td>
                {payment.status === "pending" && (
                  <button
                    onClick={() => acceptPaymentMutation.mutate(payment._id)}
                    className="btn btn-outline px-4 py-2 flex items-center gap-2"
                  >
                    Accept Payment
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentManagement;
