"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ticketSchema } from "../schemas/formSchema";

function Ticket() {

  const initialFormState = {
    shopName: "",
    safetyIssue: "NIL",
    prodTarget: "",
    prodActual: "",
    affectedDnTime: "",
    grossDnTime: "",
    majorBreakdown: "",
    employeeId: "",
    employeeName: "",
    createdBy: ""
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [token, setToken] = useState(null)
  
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem("jwtToken")
    setToken(token)
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (storedUser?.userMail) {

      setFormData((prev) => ({
        ...prev,
        createdBy: storedUser.userMail
      }));
    } else {
      router.push("/login");
    }
  }, [router]);

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
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets`, formData,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        toast.success("Form submitted successfully!");
        setFormData(initialFormState)
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error submitting form. Please try again.");
      }
    }
  };

  const validateForm = () => {
   const result = ticketSchema.safeParse(formData)

   if(!result.success){
    toast.error(result.error.errors[0].message);
    return false;
   }
   return true;
  };
  return (
    <>
      
      <form
        onSubmit={handleSubmit}
        className="mt-4 max-width p-6 border border-gray-300 bg-zinc-100 rounded-lg"
      >
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label
              htmlFor="shopName"
              className="mb-2 font-medium text-gray-900"
            >
              Shop Name: <span className="text-red-600">*</span>
            </label>
            <select
              name="shopName"
              id="shopName"
              value={formData.shopName}
              onChange={handleChange}
              className="w-full mt-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            >
              <option value="">Select Shop</option>
              <option value="Press">Press</option>
              <option value="X1">X1</option>
              <option value="X4">X4</option>
              <option value="Q5">Q5</option>
              <option value="Nova">Nova</option>
              <option value="TCF1">TCF1</option>
              <option value="TCF2">TCF2</option>
              <option value="Paint">Paint</option>
              <option value="Engine">Engine</option>
              <option value="TA">TA</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="safetyIssue"
              className="mb-2 font-medium text-gray-900"
            >
              Safety Issue: <span className="text-red-600">*</span>
            </label>
            <select
              type="text"
              id="safetyIssue"
              name="safetyIssue"
              value={formData.safetyIssue}
              onChange={handleChange}
              className="w-full mt-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            >
              <option value="">NIL</option>
              <option value="Near Miss">Near Miss</option>
              <option value="First Aid">First Aid</option>
              <option value="RWC">RWC</option>
              <option value="LTI">LTI</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="prodTarget"
              className="mb-2 font-medium text-gray-900"
            >
              Prod. Target (number):{" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              id="prodTarget"
              name="prodTarget"
              value={formData.prodTarget}
              onChange={handleChange}
              className="w-full mt-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="prodActual"
              className="mb-2 font-medium text-gray-900"
            >
              Prod. Actual (number):{" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              id="prodActual"
              name="prodActual"
              value={formData.prodActual}
              onChange={handleChange}
              className="w-full mt-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="affectedDnTime"
              className="mb-2 font-medium text-gray-900"
            >
              Affected DN. Time (mins):{" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              id="affectedDnTime"
              name="affectedDnTime"
              value={formData.affectedDnTime}
              onChange={handleChange}
              className="w-full mt-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="grossDnTime"
              className="mb-2 font-medium text-gray-900"
            >
              Gross DN. Time (mins):{" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              id="grossDnTime"
              name="grossDnTime"
              value={formData.grossDnTime}
              onChange={handleChange}
              className="w-full mt-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="majorBreakdown"
              className="mb-2 font-medium text-gray-900"
            >
              Major Breakdown: <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="majorBreakdown"
              name="majorBreakdown"
              value={formData.majorBreakdown}
              onChange={handleChange}
              className="w-full mt-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="employeeId"
              className="mb-2 font-medium text-gray-900"
            >
              Employee ID: <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="w-full mt-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="employeeName"
              className="mb-2 font-medium text-gray-900"
            >
              Employee Name: <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="employeeName"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              className="w-full mt-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Ticket;
