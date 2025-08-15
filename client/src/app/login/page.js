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
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 justify-center items-center px-4 overflow-hidden">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 tracking-wide">
              CMS DWM Portal
            </h2>
            <p className="text-gray-500 mt-2">
              Please log in with your corporate credentials
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-600 
                           transition-all bg-gray-50"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Corporate Email
              </label>
              <input
                type="email"
                name="userMail"
                value={formData.userMail}
                onChange={(e) =>
                  setFormData({ ...formData, userMail: e.target.value })
                }
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-600 
                           transition-all bg-gray-50"
                placeholder="name@tatamotors.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold 
                         text-white bg-gradient-to-r from-blue-800 to-blue-600
                         hover:from-blue-700 hover:to-blue-500 
                         focus:outline-none focus:ring-4 focus:ring-blue-300
                         transition-all disabled:opacity-50 shadow-md"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
