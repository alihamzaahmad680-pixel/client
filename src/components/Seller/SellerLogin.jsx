import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/seller/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      if (data.success) {
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Invalid Credentials");
      } else {
        console.error("Network or setup error:", error.message);
      }
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  return (
    !isSeller && (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-md bg-white shadow-xl border border-gray-200 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-primary">Seller</span>{" "}
            <span className="text-gray-800">Login</span>
          </h2>

          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dull text-white py-3 rounded-lg font-medium transition duration-200 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    )
  );
};

export default SellerLogin;
