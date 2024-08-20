import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const [error, setError] = useState("");
  const { createUser, updateUserProfile, user } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }
    if (!uppercaseRegex.test(password)) {
      setError("Password must contain at least one uppercase letter!");
      return;
    }
    if (!lowercaseRegex.test(password)) {
      setError("Password must contain at least one lowercase letter!");
      return;
    }
    
    createUser(email, password)
      .then((result) => {
        updateUserProfile(name, photo)
          .then(() => {
            const userInfo = {
              name: name,
              email: email,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              console.log("user added in the database");
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
            console.log("Profile update error:", error.message);
          });
      })
      .catch((error) => {
        console.log("User creation error:", error.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="card w-[700px] max-w-xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="p-4 lg:p-4 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
          <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
            User Registration!
          </h2>
          <form onSubmit={handleRegister} className="space-y-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700">Username</span>
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
                <span className="label-text text-gray-700">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Enter your photo URL"
                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition duration-200"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700">Email</span>
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
                <span className="label-text text-gray-700">Password</span>
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition duration-200 pr-12" // Adjust padding-right
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

            <p className="text-center mt-4 text-2xl text-gray-700">
              <small>
                Already have an account?
                <Link
                  to="/login"
                  className="text-blue-800 font-bold ml-4 font-bold"
                >
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
