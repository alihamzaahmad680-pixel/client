import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

export const Login = () => {
  const { setShowUserLogin, setUser, navigate } = useAppContext();

  const [state, setState] = useState("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const payload =
        state === "signup" ? { name, email, password } : { email, password };

      
      const endpoint =
        state === "signup"
          ? "https://server-kohl-nine-68.vercel.app/api/user/register"
          : "https://server-kohl-nine-68.vercel.app/api/user/login";

      const { data } = await axios.post(endpoint, payload, {
        withCredentials: true,
      });

      if (data.success) {
        setUser(data.user);
        navigate("/");
        setShowUserLogin(false);

        toast.success(
          state === "signup"
            ? "Account created successfully"
            : "Login successful",
        );

        setName("");
        setEmail("");
        setPassword("");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Authentication failed");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-gray-500 max-w-[380px] w-full mx-4 p-6 text-left rounded-xl shadow-lg"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {state === "signup" ? "Create Account" : "Login"}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {state === "signup"
              ? "Create your account to continue"
              : "Welcome back! Please login to continue"}
          </p>
        </div>

        {state === "signup" && (
          <div className="mb-4">
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-primary focus:border-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-primary focus:border-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            required
          />
        </div>

        <div className="mb-5">
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-primary focus:border-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dull transition py-3 rounded-lg text-white font-medium"
        >
          {state === "signup" ? "Create Account" : "Login"}
        </button>

        <p className="text-center text-sm mt-5">
          {state === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}
          <button
            type="button"
            onClick={() => setState(state === "signup" ? "login" : "signup")}
            className="ml-1 text-primary font-medium hover:underline"
          >
            {state === "signup" ? "Login" : "Sign Up"}
          </button>
        </p>

        <button
          type="button"
          onClick={() => setShowUserLogin(false)}
          className="mt-4 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition bg-primary/10 text-primary font-medium"
        >
          Close
        </button>
      </form>
    </div>
  );
};
