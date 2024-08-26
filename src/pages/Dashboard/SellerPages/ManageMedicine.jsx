import React, { useState, useEffect, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";

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
    sellerEmail: "", // Initial value empty
  });

  // Effect to update sellerEmail once user data is available
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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Medicines</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add Medicine
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full mt-4">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Description</th>
              <th>Type</th>
              <th>Dosage</th>
              <th>No Of Medicines</th>
              <th>Company</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {medicines?.map((medicine) => (
              <tr key={medicine._id}>
                <td>{medicine.name}</td>
                <td>{medicine.category}</td>
                <td>{medicine.price}</td>
                <td>{medicine.description}</td>
                <td>{medicine.type}</td>
                <td>{medicine.dosage}</td>
                <td>{medicine.noOfMedicines}</td>
                <td>{medicine.company}</td>
                <td>{medicine.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">Add New Medicine</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Item Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
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
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  type="text"
                  name="type"
                  placeholder="Type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  type="text"
                  name="dosage"
                  placeholder="Dosage"
                  value={formData.dosage}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  type="number"
                  name="noOfMedicines"
                  placeholder="No Of Medicines"
                  value={formData.noOfMedicines}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Add Medicine
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ml-2"
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
