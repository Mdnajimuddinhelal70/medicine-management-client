import React, { useState, useContext } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2"; 

const ManageMedicine = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    category: "",
    price: "",
    description: "",
    type: "",
    dosage: "",
    noOfMedicines: 0,
    company: "",
    quantity: 0,
    sellerEmail: user?.email,
  });
  const [imageFile, setImageFile] = useState(null);

  const { data: medicines = [], isLoading, error } = useQuery({
    queryKey: ['myMedicine'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myMedicine?sellerEmail=${user?.email}`);
      return res.data;
    }
  });

  const handleImageUpload = async () => {
    if (!imageFile) return;
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: {
            key: import.meta.env.VITE_IMGBB_API_KEY,
          },
        }
      );
      return response.data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = formData.image;
    if (imageFile) {
      imageUrl = await handleImageUpload();
    }
    const updatedFormData = { ...formData, image: imageUrl };

    try {
      await axiosSecure.post("/myMedicine", updatedFormData);
      queryClient.invalidateQueries(["myMedicine"]);
      setIsModalOpen(false);
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Medicine added successfully!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error("Error adding medicine:", error);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again.',
      });
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading medicines</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Medicines</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-cyan-400 text-yellow-900 font-bold px-6 py-3 rounded-lg shadow-md hover:bg-cyan-500 transition-colors"
      >
        Add Medicine
      </button>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Item Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Company</th>
              <th className="py-3 px-4 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr
                key={medicine._id}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="py-3 px-4">
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-16 h-8 object-cover rounded-md"
                  />
                </td>
                <td className="py-3 px-4">{medicine.name}</td>
                <td className="py-3 px-4">{medicine.category}</td>
                <td className="py-3 px-4">{medicine.price}</td>
                <td className="py-3 px-4">{medicine.type}</td>
                <td className="py-3 px-4">{medicine.company}</td>
                <td className="py-3 px-4">{medicine.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <Helmet>
            <title>Health || Manage Medicines</title>
          </Helmet>
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Add New Medicine
            </h3>

            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Item Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="file"
                  name="image"
                  placeholder="Upload Image"
                  onChange={handleFileChange}
                  className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="tablet">Tablet</option>
                  <option value="syrup">Syrup</option>
                  <option value="capsule">Capsule</option>
                  <option value="injection">Injection</option>
                  <option value="others">Others</option>
                </select>
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="type"
                  placeholder="Type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="dosage"
                  placeholder="Dosage"
                  value={formData.dosage}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="noOfMedicines"
                  placeholder="No Of Medicines"
                  value={formData.noOfMedicines}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors"
                >
                  Save Medicine
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-600 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-colors ml-4"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMedicine;
