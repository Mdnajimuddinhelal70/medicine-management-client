import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const Carts = () => {
    const [cart, refetch] = useCart();
    const axiosSecure = useAxiosSecure();
    const handleClear = id => {
    axiosSecure.delete(`/carts/${id}`)
    .then(res => {
        if(res.data.deletedCount > 0){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your item has cleared",
                showConfirmButton: false,
                timer: 1500
              });
              refetch()
        }
    })
    }
  return (
    <div className="overflow-x-auto mx-10 my-10">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
             #
            </th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Check Box</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => <tr key={item._id}>
            <th>
             {index + 1}
            </th>
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
            <td>
             {item.name}
            </td>
            <td>{item.price}</td>
            <th>
              <button
              
              className="btn btn-ghost btn-xs">Check Box</button>
            </th>
            <th>
              <button
              onClick={ () => handleClear(item._id)}
              className="btn btn-ghost btn-xs">Clear</button>
            </th>
          </tr>)}
          
        </tbody>
        {/* foot */}
      </table>
    </div>
  );
};

export default Carts;
