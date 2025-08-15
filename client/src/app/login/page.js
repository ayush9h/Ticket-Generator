"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { User, Mail, LogIn, AlertTriangle } from "lucide-react";
import { toast } from "react-hot-toast";

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
      if (err.response?.data?.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("An error occurred while logging in.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 justify-center items-center px-4">
        <div className="bg-white shadow-lg rounded-2xl p-12 w-full max-w-2xl border border-gray-200">
          <div className="text-center mb-6">
            <h2 className="text-3xl  text-gray-800">
              CMS DWM Data Capturing System
            </h2>
            <p className="text-gray-500 mt-2 text-base">
              Please log in with your corporate credentials
            </p>
          </div>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-8 rounded-md flex items-center gap-2 text-sm">
            <AlertTriangle size={20} className="text-yellow-600" />
            If you are unable to log in, please contact the administrator for access.
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 bg-gray-50">
                <span className="px-4 text-gray-500">
                  <User size={20} />
                </span>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                  className="w-full py-4 px-3 outline-none bg-transparent text-gray-800 text-base"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Corporate Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 bg-gray-50">
                <span className="px-4 text-gray-500">
                  <Mail size={20} />
                </span>
                <input
                  type="email"
                  name="userMail"
                  value={formData.userMail}
                  onChange={(e) =>
                    setFormData({ ...formData, userMail: e.target.value })
                  }
                  className="w-full py-4 px-3 outline-none bg-transparent text-gray-800 text-base"
                  placeholder="name@tatamotors.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-lg font-semibold text-lg text-white 
                         bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600
                         focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all 
                         disabled:opacity-50 shadow-lg"
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  <LogIn size={22} /> Login
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
