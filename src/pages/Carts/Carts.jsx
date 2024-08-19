import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";

const Carts = () => {
  const [cart, refetch] = useCart();
  
  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', '')); 
    const quantity = item.quantity || 0; 
    return total + (price * quantity);
  }, 0);
  
  const axiosSecure = useAxiosSecure();
  
  const handleClear = (id) => {
    axiosSecure.delete(`/carts/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your item has cleared",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  const handleQuantityChange = (id, quantity) => {
    axiosSecure.patch(`/carts/${id}`, { quantity }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  return (
    <>
      <div className="h2-text-2xl">Total Price: ${totalPrice.toFixed(2)}</div>
      <div className="overflow-x-auto mx-10 my-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Company Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.company}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      className="btn btn-ghost btn-xs"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="input input-bordered input-xs w-16 text-center"
                    />
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      className="btn btn-ghost btn-xs"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{item.price}</td>
                <th>
                  <button
                    onClick={() => handleClear(item._id)}
                    className="btn btn-ghost btn-xs"
                  >
                    Clear
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end m-4">
          {/* Checkout Button */}
          <button className="btn btn-outline text-xl font-bold">
            <Link to="/payment">Check Out</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Carts;
