import React, { useState, useEffect, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";

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
    sellerEmail: "",
  });

  useEffect(() => {
    if (user?.email) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        sellerEmail: user.email,
      }));
    }
  }, [user]);

  const { data: medicines, isLoading } = useQuery({
    queryKey: ["myMedicine"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/myMedicine?sellerEmail=${user?.email}`
      );
      return res.data;
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data being sent:", formData);
    const response = await axiosSecure.post("/myMedicine", formData);
    console.log(response.data);
    queryClient.invalidateQueries(["myMedicine"]);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Manage Medicines
      </h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-cyan-400 text-yellow-900 font-bold px-6 py-3 rounded-lg shadow-md hover:bg-cyan-500 transition-colors"
      >
        Add Medicine
      </button>

      {isLoading ? (
        <p className="mt-6 text-lg text-gray-600">Loading...</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Item Name</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Company</th>
                <th className="py-3 px-4 text-left">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {medicines?.map((medicine) => (
                <tr
                  key={medicine._id}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-4">{medicine.name}</td>
                  <td className="py-3 px-4">{medicine.category}</td>
                  <td className="py-3 px-4">${medicine.price}</td>
                  <td className="py-3 px-4">{medicine.type}</td>
                  <td className="py-3 px-4">{medicine.company}</td>
                  <td className="py-3 px-4">{medicine.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleInputChange}
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
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors"
                >
                  Add Medicine
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-colors"
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
