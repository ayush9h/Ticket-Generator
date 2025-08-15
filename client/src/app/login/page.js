"use client"
import axios from "axios";
import React, { useState } from "react";

const createOrGetUser = async (userData) => {
  const response = await axios.post(
    `http://localhost:5000/api/user/login`,
    userData
  );
  return response.data;
};

const LoginPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userMail: "",
  });

  const [serverResponse, setServerResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.userMail) {
      alert("Please fill in all fields");
      return;
    }
    const user = await createOrGetUser(formData);
    setServerResponse(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
         
          <div>
            <label className="block text-gray-600 mb-1">User Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">User Email</label>
            <input
              type="email"
              name="userMail"
              value={formData.userMail}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-200"
          >
            Login / Register
          </button>
        </form>

        {serverResponse && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold mb-2 text-gray-700">Server Response:</h4>
            <pre className="text-sm text-gray-600 overflow-x-auto">
              {JSON.stringify(serverResponse, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
