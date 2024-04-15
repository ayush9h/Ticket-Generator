"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function CreateRequest() {
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedApprover, setSelectedApprover] = useState("");
  const [description, setDescription] = useState("");
  const [issuer, setIssuer] = useState("");

  const handleShopSelect = (shop) => {
    setSelectedShop(shop);
  };

  const handleApproverSelect = (approver) => {
    setSelectedApprover(approver);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleIssuerChange = (event) => {
    setIssuer(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedApprover || !selectedShop || !description) {
      alert("Please enter all the fields.");
      return;
    }

    console.log(issuer)

    try {
      const res = await fetch("http://localhost:3000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          issuer,
          selectedShop,
          selectedApprover,
          description,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create a Request");
      }

      console.log("Request created successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Request Grid */}
      <div className='border-2 border-slate-300 rounded-md p-4'>
        <h1 className='text-xl text-black font-semibold mb-5'>
          Create{" "}
          <span className='text-xl text-blue-700 font-semibold'>Request</span>
        </h1>

        <input
          type='text'
          value={issuer}
          onChange={handleIssuerChange}
          className='border-2 border-slate-200 p-3 mb-4 w-full rounded-md text-black' placeholder="Enter your Id">
          </input>

        {/* Select Shop */}

        <DropdownMenu>
          <div className='border-2 border-slate-200 mb-4 rounded-md flex justify-between p-3'>
            <h1 className='text-md'>{selectedShop || "Choose Shop"}</h1>
            <DropdownMenuTrigger>
              <ChevronDown className='w-5 h-5' />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleShopSelect("TCF-1")}>
              TCF-1
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShopSelect("TCF-2")}>
              TCF-2
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShopSelect("NOVA")}>
              NOVA
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShopSelect("Paint Shop")}>
              Paint Shop
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShopSelect("Press Shop")}>
              Press Shop
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShopSelect("Train Axle")}>
              Train Axle
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShopSelect("Engine")}>
              Engine
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShopSelect("Jaguar")}>
              Jaguar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Select Approver */}
        <DropdownMenu>
          <div className='border-2 border-slate-200 mb-4 rounded-md flex justify-between p-3'>
            <h1 className='text-md'>{selectedApprover || "Choose Approver"}</h1>
            <DropdownMenuTrigger>
              <ChevronDown className='w-5 h-5' />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => handleApproverSelect("Anand Selvan")}>
              Anand Selvan
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleApproverSelect("Abhay Kulkarni")}>
              Abhay Kulkarni
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleApproverSelect("Baijnath Gonchikar")}>
              Baijnath Gonchikar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleApproverSelect("Rakesh Jha")}>
              Rakesh Jha
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleApproverSelect("Sneha")}>
              Sneha
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Description of request */}
        <textarea
          name='description'
          className='w-full border-2 border-slate-200 p-2 h-40 rounded-md mb-2'
          placeholder='Enter request description'
          value={description}
          onChange={handleDescriptionChange}></textarea>

        {/*  Submit Request Button */}
        <button
          type='submit'
          onClick={handleSubmit}
          className='bg-blue-700 text-white p-4 text-center w-full rounded-md hover:bg-blue-800'>
          Submit Request
        </button>
      </div>
    </>
  );
}
