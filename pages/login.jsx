import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {login} from "../utils/userSlice"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  async function dataSend() {
    try {
      let data = await fetch(`${import.meta.env.VITE_API}/api/v1/login`, {
        method: "POST",
        body: JSON.stringify({email,password}),
        headers: {
          "content-type": "application/json",
        },
      });
      let res = await data.json();
      if (!res.success) {
        toast.error(res.message,{
          duration:3000
        })
      }
      if (res.success) {
        localStorage.setItem("user", JSON.stringify({token:res.token,userDetail:res.userDetail}));
        dispatch(login({token:res.token,userDetail:res.userDetail}))
        toast.success("Login Successfully",{
          duration:3000
        })
      }
    } catch (error) {
      console.log("An error occurred. Please try again.");
      console.log(error)
    }
  }

 

  const handleSubmit = (e) => {
    e.preventDefault();
    dataSend();

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
        <p className="text-center text-sm font-medium text-gray-700 m-2"><Link to={"/signup"}>Create New Account</Link></p>
      </form>
      <Toaster/>
    </div>
  );
};

export default Login;