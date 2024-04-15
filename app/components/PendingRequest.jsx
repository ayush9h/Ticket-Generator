"use client"
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const getRequests = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/requests", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch requests");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading requests", error);
  }
};


export default async function PendingRequest() {
  const generateExcelReport = async () => {
    try {
      const { requests } = await getRequests();
  
      const data = requests.map((r) => ({
        "Request Shop": r.shopname,
        "Approver": r.approver,
        "RequesterId": r.issuer,
        "CreatedAt": r.createdAt
      }));
  
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Requests");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, "requests.xlsx");
    } catch (error) {
      console.log("Error generating Excel report", error);
    }
  };

  
  try {
    const { requests } = await getRequests();
    return (
      <>
        <div>
          <div className="flex justify-between">
            <h1 className='text-xl text-black font-semibold'>
              Pending{" "}
              <span className='text-xl text-blue-700 font-semibold'>
                Requests
              </span>
            </h1>
            <button className="bg-black text-white px-5 rounded-2xl" onClick={generateExcelReport}>Generate Report</button>
          </div>

          <div className='py-3 rounded-md bg-slate-100 border-2 border-slate-400 mt-5 h-80 overflow-y-scroll'>
            <div className='flex justify-between bg-slate-100 px-4 border-b-2 border-slate-500'>
              <div className='font-bold mb-5 mt-3'>Request Shop</div>
              <div className='font-bold mb-5 mt-3'>Requester Id</div>
              <div className='font-bold mb-5 mt-3'>Approver</div>
            </div>
            {requests.map((r) => (
              <div className='flex justify-between bg-slate-100 p-4 border-b-2 border-slate-500 '>
                <div className='px-1 flex text-center'>{r.shopname}</div>
                <div className='px-1 flex text-center'>{r.issuer}</div>
                <div className='px-1 flex text-center'>{r.approver}</div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.log("Error loading requests", error);
    return null;
  }
}
