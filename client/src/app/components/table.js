"use client";
import { useEffect, useState } from "react";
import axios from "axios"; 
import * as XLSX from "xlsx";
import { toast } from "react-hot-toast";

export default function TicketTable() {
  const [data, setData] = useState([]);
  const [refreshTime, setRefreshTime] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tickets"); 
        setData(response.data); 
      } catch (error) {
        console.error("Error fetching data:", error); 
      }
    };

    fetchData();

    const currentDate = new Date();
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    
    setRefreshTime(nextDay.toLocaleDateString() + " at " + currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, []);

  const exportToExcel = async () => {
    if (data.length === 0) {
      toast.error("No data available to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ticket Data");
    XLSX.writeFile(workbook, `ticket_data_${new Date().toISOString().split("T")[0]}.xlsx`);
    toast.success("Data exported to Excel successfully!");
  };

  return (
    <div className="max-width mt-10 mb-10 p-5 bg-white border border-zinc-400 rounded-md shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Today's Tickets</h2>
        <div className="flex items-center">
          <button 
            onClick={exportToExcel} 
            className="w-32 p-2 text-black bg-transparent border border-zinc-500 rounded-md hover:bg-black hover:text-white transition-all mr-4"
          >
            Export
          </button>
          <div className="p-2 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-md">
            Data will be refreshed on {refreshTime}.
          </div>
        </div>
      </div>

      {data.length > 0 ? (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="p-2 bg-slate-200 border border-slate-400">Shop Name</th>
              <th className="p-2 bg-slate-200 border border-slate-400">Safety Issue</th>
              <th className="p-2 bg-slate-200 border border-slate-400">Prod Target</th>
              <th className="p-2 bg-slate-200 border border-slate-400">Prod Actual</th>
              <th className="p-2 bg-slate-200 border border-slate-400">Affected Dn Time</th>
              <th className="p-2 bg-slate-200 border border-slate-400">Gross Dn Time</th>
              <th className="p-2 bg-slate-200 border border-slate-400">Major Breakdown</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ticket, index) => (
              <tr key={index}>
                <td className="p-2 border border-slate-300">{ticket.shopName}</td>
                <td className="p-2 border border-slate-300">{ticket.safetyIssue}</td>
                <td className="p-2 border border-slate-300">{ticket.prodTarget}</td>
                <td className="p-2 border border-slate-300">{ticket.prodActual}</td>
                <td className="p-2 border border-slate-300">{ticket.affectedDnTime}</td>
                <td className="p-2 border border-slate-300">{ticket.grossDnTime}</td>
                <td className="p-2 border border-slate-300">{ticket.majorBreakdown}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tickets available for today.</p>
      )}
    </div>
  );
}
