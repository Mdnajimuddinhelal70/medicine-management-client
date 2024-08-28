import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const { loginUser, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
   

    loginUser(email, password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Login successfull",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
    .then((result) => {
      navigate(from, {replace: true})
      const userInfo ={
        name: result.user?.displayName,
        email: result.user?.email,     
      }
      axiosPublic.post('/users', userInfo)
      .then(res => {
        // console.log(res.data)
      })  
    });
  };
 

  return (
    <div className="hero min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="p-8 lg:p-10 bg-gradient-to-r from-indigo-500 from-10% via-sky-400 via-30% to-emerald-500 to-90% ...">
          <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
            Welcome Back !
          </h2>
          <Helmet>
            <title>Volunteer || Login</title>
            <link rel="canonical" href="https://www.tacobell.com/" />
          </Helmet>
          <form onSubmit={handleLogin} className="space-y-4">
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
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition duration-200"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-2">
                <button
                  type="button"
                  className="focus:outline-none mr-12 mt-4"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-outline w-full transition duration-200"
                type="submit"
                value="Login"
              />
            </div>
            <div>
              <button
                className="btn btn-outline w-full"
                onClick={handleGoogleLogin}
              >
                Google
                <FaGoogle />
              </button>
            </div>
            <p className="text-center mt-4 text-2xl text-black">
              <small>
                New here? go to
                <Link to="/register" className="text-blue-800 font-bold ml-3">
                  Sign-Up
                </Link>
              </small>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
