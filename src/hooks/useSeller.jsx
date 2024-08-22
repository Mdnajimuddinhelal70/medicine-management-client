// import { useContext } from "react";
// import useAxiosSecure from "./useAxiosSecure";
// import { AuthContext } from "../Providers/AuthProvider";
// import { useQuery } from "@tanstack/react-query";

// const useSeller = () => {
//     const { user } = useContext(AuthContext);
//     const axiosSecure = useAxiosSecure();

//     const { data: isSeller } = useQuery({
//         queryKey: [user?.email, 'isSeller'],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/seller/${user?.email}`);
//             console.log(res.data);
//             return res.data?.seller;
//         }
//     });

//     return [isSeller];
// };

// export default useSeller;
