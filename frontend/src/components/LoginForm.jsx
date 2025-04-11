import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

const LoginForm = () => {
  const [loginType, setLoginType] = useState("hindavi");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "hindavi",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authAPI.login({
        ...credentials,
        role: loginType,
      });


      // Debugging: Check token existence
      if (!data?.token) {
        throw new Error("Token not found in response");
      }

      // Store token in localStorage
      localStorage.setItem("token", data?.token);
      console.log("Token stored successfully:", localStorage.getItem("token"));

      // Navigate to dashboard based on role
      navigate(`/dashboard-${loginType}`);

      console.log("Navigated to dashboard");

    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <div className="flex mb-6">
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            loginType === "hindavi"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setLoginType("hindavi")}
        >
          हिंदवी
        </button>
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            loginType === "gurukul"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setLoginType("gurukul")}
        >
          गुरुकुल
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-3 py-2 border rounded"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
