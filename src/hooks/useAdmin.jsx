
// import { useContext } from "react";
// import { AuthContext } from "../Providers/AuthProvider";
// import useAxiosSecure from "./useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";

// const useAdmin = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();

//   const { data: isAdmin, isLoading, isError } = useQuery({
//     queryKey: [user?.email, "isAdmin"],
//     queryFn: async () => {
//       if (!user?.email) return false; // ইউজার ইমেইল না থাকলে false রিটার্ন করবে
//       const res = await axiosSecure.get(`/users/admin/${user?.email}`);
//       return res.data?.admin;
//     },
//     enabled: !!user?.email, // ইউজার ইমেইল থাকলেই কেবলমাত্র কোয়েরি চলবে
//   });

//   if (isLoading) {
//     console.log("Checking admin status...");
//   }

//   if (isError) {
//     console.error("Failed to check admin status.");
//   }

//   // return [isAdmin, isLoading, isError];
// };

// export default useAdmin;
