import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Dialog, Listbox } from "@headlessui/react";
import { Helmet } from "react-helmet-async";

const roles = ["admin", "seller", "user"];

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRoleUpdate = async () => {
    if (selectedUser && selectedRole) {
      axiosSecure
        .patch(`/users/role/${selectedUser._id}`, { role: selectedRole })
        .then((res) => {
          console.log("Response:", res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${selectedUser.name} is now a ${selectedRole}`,
              showConfirmButton: false,
              timer: 1500,
            });
            setSelectedUser(null);
            setSelectedRole("");
          }
        });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Health || Manage User</title>
      </Helmet>
      <div className="flex justify-evenly my-4">
        <h2 className="text-2xl">All users</h2>
        <h2 className="text-2xl">Total users: {users.length}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setSelectedRole(user.role);
                    }}
                    className="btn btn-md bg-slate-600 text-white"
                  >
                    <FaEdit className="text-white text-xl" /> Update Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <Dialog
          open={true}
          onClose={() => setSelectedUser(null)}
          className="fixed inset-0 z-10 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded shadow-lg max-w-md mx-auto">
            <Dialog.Title className="text-lg font-bold">
              Update Role for {selectedUser.name}
            </Dialog.Title>
            <div className="mt-4">
              <Listbox value={selectedRole} onChange={setSelectedRole}>
                <Listbox.Button className="btn btn-outline w-full">
                  {selectedRole}
                </Listbox.Button>
                <Listbox.Options className="bg-white border rounded mt-2 shadow-lg">
                  {roles.map((role) => (
                    <Listbox.Option
                      key={role}
                      value={role}
                      className="cursor-pointer p-2 hover:bg-gray-200"
                    >
                      {role}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button onClick={handleRoleUpdate} className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default ManageUsers;
