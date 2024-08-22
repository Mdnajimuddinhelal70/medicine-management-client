// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";
// import { useContext } from "react";
// import { AuthContext } from "../Providers/AuthProvider";

// const useUser = () => {
//     const { user } = useContext(AuthContext);
//     const axiosSecure = useAxiosSecure();

//     const { data: isUser } = useQuery({
//         queryKey: [user?.email, 'isUser'],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/user/${user?.email}`);
//             console.log(res.data);
//             return res.data?.user;
//         }
//     });

//     return [isUser];
// };

// export default useUser;
