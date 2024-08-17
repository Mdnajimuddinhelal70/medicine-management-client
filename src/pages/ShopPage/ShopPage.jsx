import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const ShopPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useContext(AuthContext);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const axiosSecure = useAxiosSecure();

  const { data: shop = [] } = useQuery({
    queryKey: ['shop'],
    queryFn: async () => {
      const res = await axiosSecure.get('/medicine');
      return res.data;
    },
  });

  const toggleModal = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(!isModalOpen);
  };

   const handleSelect = (medicine) => {
      if(user && user.email){
        const shopItem ={
          medicineId: medicine._id,
          email: user.email,
          name: medicine.name,
          image: medicine.image,
          price: medicine.price,
          dosage: medicine.dosage,
        }; 
        axiosSecure.post('/carts', shopItem)
        .then(res => {
          console.log(res.data)
          if(res.data.insertedId){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${medicine.name} selected to the cart`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
      }
   }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shop Page</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Dosage</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center items-center justify-center gap-4">
          {shop.map((medicine, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{medicine.name}</td>
              <td className="py-2 px-4 border-b">{medicine.category}</td>
              <td className="py-2 px-4 border-b">{medicine.price}</td>
              <td className="py-2 px-4 border-b">{medicine.type}</td>
              <td className="py-2 px-4 border-b">{medicine.dosage}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="btn btn-sm bg-yellow-300 text-black mr-2"
                  onClick={() => toggleModal(medicine)}
                >
                  <FaEye />
                </button>
                <button
                onClick={() => handleSelect(medicine)}
                className="btn btn-sm bg-green-500 text-white">
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && selectedMedicine && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Medicine Details</h2>
            <img
              src={selectedMedicine.image || "https://via.placeholder.com/150"}
              alt={selectedMedicine.name}
              className="mb-4"
            />
            <p><strong>Name:</strong> {selectedMedicine.name}</p>
            <p><strong>Description:</strong> {selectedMedicine.description}</p>
            <p><strong>Category:</strong> {selectedMedicine.category}</p>
            <p><strong>Price:</strong> {selectedMedicine.price}</p>
            <p><strong>Type:</strong> {selectedMedicine.type}</p>
            <p><strong>Dosage:</strong> {selectedMedicine.dosage}</p>
            <button
              className="btn bg-sky-500 text-white mt-4"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="flex justify-end mt-4">
        <button className="btn btn-ghost bg-slate-400">
          <Link to="/">Back</Link>
        </button>
      </div>
    </div>
  );
};

export default ShopPage;
