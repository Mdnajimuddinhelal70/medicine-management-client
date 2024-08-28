import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const [error, setError] = useState("");
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.files[0];
    const email = form.email.value;
    const password = form.password.value;

   
    const formData = new FormData();
    formData.append("image", photo);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );

      if (data.success) {
        const photoUrl = data.data.display_url;

        createUser(email, password)
          .then(() => {
            updateUserProfile(name, photoUrl)
              .then(() => {
                const userInfo = {
                  name,
                  email,
                  role: "user",
                };

                axiosPublic.post("/users", userInfo).then((res) => {
                  if (res.data.insertedId) {
                    navigate("/");
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "User Registration Successful",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                });
              })
              .catch((error) => {
                console.error("Profile update error:", error.message);
              });
          })
          .catch((error) => {
            console.error("User creation error:", error.message);
          });
      }
    } catch (error) {
      console.error("Image upload error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Image upload failed. Please try again!",
      });
    }
  };

  return (
    <div className="hero min-h-screen h-14 flex items-center justify-center">
      <div className="card w-[700px] max-w-xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="p-4 lg:p-4 bg-gradient-to-r from-indigo-900 via-sky-500 to-emerald-500">
          <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
            User Registration!
          </h2>
          <form onSubmit={handleRegister} className="space-y-2 px-10">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-lime-400">Username</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition duration-200"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-lime-400 font-medium">
                  Upload Image
                </span>
              </label>
              <input
                type="file"
                name="photo"
                className="file-input file-input-bordered w-full transition duration-200 bg-black text-white"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-lime-400">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition duration-200"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text text-xl text-lime-400">Password</span>
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition duration-200 pr-12"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none mt-9"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <div className="form-control mt-6">
              <input
                className="btn btn-outline w-full transition duration-200"
                type="submit"
                value="Register"
              />
            </div>
            <p className="text-center mt-4 text-2xl text-black">
              <small>
                Already have an account?
                <Link to="/login" className="text-blue-800 font-bold ml-4">
                  Sign-In
                </Link>
              </small>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
