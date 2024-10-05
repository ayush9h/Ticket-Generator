"use client";
import { useState } from "react";
import axios from "axios"; 
import { toast } from "react-hot-toast";

export default function Ticket() {
  const [formData, setFormData] = useState({
    shopName: "",
    safetyIssue: "",
    prodTarget: "",
    prodActual: "",
    affectedDnTime: "",
    grossDnTime: "",
    majorBreakdown: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post("https://ticket-generator-h2gs.onrender.com/api/tickets", formData);
        toast.success("Form submitted successfully!");
        setFormData({
          shopName: "",
          safetyIssue: "",
          prodTarget: "",
          prodActual: "",
          affectedDnTime: "",
          grossDnTime: "",
          majorBreakdown: "",
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error submitting form. Please try again.");
      }
    }
  };

  const validateForm = () => {
    const { shopName, safetyIssue, prodTarget, prodActual, affectedDnTime, grossDnTime, majorBreakdown } = formData;
    if (!shopName || !safetyIssue || !prodTarget || !prodActual || !affectedDnTime || !grossDnTime || !majorBreakdown) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-4 max-width p-5 bg-white border border-zinc-400 rounded-md shadow-xl">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="shopName">Shop Name: <span className="text-red-600">*</span></label>
            <input
              type="text"
              id="shopName"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              className="w-full p-2 border border-zinc-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="safetyIssue">Safety Issue: <span className="text-red-600">*</span></label>
            <input
              type="text"
              id="safetyIssue"
              name="safetyIssue"
              value={formData.safetyIssue}
              onChange={handleChange}
              className="w-full p-2 border border-zinc-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="prodTarget">Prod. Target: <span className="text-red-600">*</span></label>
            <input
              type="number"
              id="prodTarget"
              name="prodTarget"
              value={formData.prodTarget}
              onChange={handleChange}
              className="w-full p-2 border border-zinc-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="prodActual">Prod. Actual: <span className="text-red-600">*</span></label>
            <input
              type="number"
              id="prodActual"
              name="prodActual"
              value={formData.prodActual}
              onChange={handleChange}
              className="w-full p-2 border border-zinc-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="affectedDnTime">Affected Dn Time: <span className="text-red-600">*</span></label>
            <input
              type="text"
              id="affectedDnTime"
              name="affectedDnTime"
              value={formData.affectedDnTime}
              onChange={handleChange}
              className="w-full p-2 border border-zinc-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="grossDnTime">Gross DN Time: <span className="text-red-600">*</span></label>
            <input
              type="text"
              id="grossDnTime"
              name="grossDnTime"
              value={formData.grossDnTime}
              onChange={handleChange}
              className="w-full p-2 border border-zinc-300 rounded-md"
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="majorBreakdown">Major Breakdown: <span className="text-red-600">*</span></label>
          <input
            type="text"
            id="majorBreakdown"
            name="majorBreakdown"
            value={formData.majorBreakdown}
            onChange={handleChange}
            className="w-full p-2 border border-zinc-300 rounded-md"
          />
        </div>

        <div className="flex space-x-4 mt-4">
          <button type="submit" className="p-2 text-white bg-black rounded-md">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
