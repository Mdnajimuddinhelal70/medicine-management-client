import React, { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";

const SellerAdvertise = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    medicineImage: "",
    description: "",
  });

  
  const { data: advertisements, isLoading } = useQuery({
    queryKey: ["advertisements", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/advertisements?sellerEmail=${user?.email}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (newAd) => axiosSecure.post("/advertisements", newAd),
    onSuccess: () => {
      queryClient.invalidateQueries(["advertisements", user?.email]);
      setIsModalOpen(false);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newAdvertisement = {
      sellerEmail: user.email,
      medicineImage: formData.medicineImage,
      description: formData.description,
    };
    mutation.mutate(newAdvertisement);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Advertisements</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-success"
      >
        Add Advertisement
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full mt-4">
          <thead>
            <tr>
              <th>Medicine Image</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {advertisements?.map((ad) => (
              <tr key={ad._id}>
                <td>
                  <img src={ad.medicineImage} alt="Medicine" className="w-16 h-10 mb-4" />
                </td>
                <td>{ad.description}</td>
                <td>{ad.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Add Advertisement</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="medicineImage"
                  placeholder="Medicine Image URL"
                  value={formData.medicineImage}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                ></textarea>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="btn btn-outline"
                >
                  Add Advertisement
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

export default SellerAdvertise;
