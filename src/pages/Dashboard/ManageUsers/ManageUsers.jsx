import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import { FaUser } from 'react-icons/fa';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure?.get('/users');
            return res.data;
        }
    });

    return (
        <div>
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
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => handleMakeAdmin(users)}
                                        className='btn btn-md bg-sky-800 text-white'
                                        >
                                            <FaUser
                                            className='text-white text-xl'
                                            ></FaUser>
                                    </button>
                                </td>
                                <td>
                                    
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
