"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ userName: "", userMail: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", formData);
      localStorage.setItem("loggedUser", JSON.stringify(res.data));
      router.push("/"); 
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex h-screen justify-center items-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full animate-fadeIn">
          <h2 className="text-2xl font-bold text-center text-indigo-800 mb-6">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="userMail"
                value={formData.userMail}
                onChange={(e) => setFormData({ ...formData, userMail: e.target.value })}
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-700 text-white rounded-lg font-semibold hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
