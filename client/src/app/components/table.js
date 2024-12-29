"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-hot-toast";
import Popup from "reactjs-popup";
import { Trash2, RefreshCcw, DownloadIcon } from "lucide-react";

async function fetchTableData() {
  let response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tickets`)
  return response.data
}

const deleteTicket = async (id, refreshData) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tickets/delete/${id}`);
    toast.success("Ticket deleted successfully")
    refreshData();
  } catch (error) {
    toast.error("Failed to delete the ticket.")
  }
}

async function TicketTable() {
  const [data, setData] = useState([])

  const loadData = async () => {
    let newData = await fetchTableData()
    setData(newData)
  }

  useEffect(() => {
    loadData();
  }, [])

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
    <div className="max-width mt-10 mb-10 p-5 border border-gray-300 bg-zinc-100 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold hidden sm:block md:text-xl">Tickets</h2>

        <div className="flex justify-between items-center">
          <button
            onClick={loadData}
            className=" flex justify-center items-center text-blue-700 bg-blue-100 hover:bg-blue-200 font-medium rounded-lg mr-4 focus:outline-none px-2 py-1 sm:w-28 sm:px-3 sm:py-2 md:w-32 md:px-4 md:py-2.5"
          >
            <RefreshCcw size={16} className="mr-2" /> Refresh
          </button>

          <button
            onClick={exportToExcel}
            className="flex justify-center items-center w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-2 py-1 sm:w-28 sm:px-3 sm:py-2 md:w-32 md:px-4 md:py-2.5"
          >
            <DownloadIcon size={16} className="mr-2" /> Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full md:w-auto">
          <thead>
            <tr>
              <th className="p-2 bg-blue-100 border border-slate-400">Shop Name</th>
              <th className="p-2 bg-blue-100 border border-slate-400">Safety Issue</th>
              <th className="p-2 bg-blue-100 border border-slate-400">Prod Target</th>
              <th className="p-2 bg-blue-100 border border-slate-400">Prod Actual</th>
              <th className="p-2 bg-blue-100 border border-slate-400">Affected DN. Time</th>
              <th className="p-2 bg-blue-100 border border-slate-400">Gross DN. Time</th>
              <th className="p-2 bg-blue-100 border border-slate-400">Major Breakdown</th>
              <th className="p-2 bg-blue-100 border border-slate-400">Employee ID</th>
              <th className="p-2 bg-blue-100 border border-slate-400">Employee Name</th>
              <th className="p-2 bg-blue-100 border border-slate-400">Actions</th>

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
                <td className="p-2 border border-slate-300">{ticket.employeeId}</td>
                <td className="p-2 border border-slate-300">{ticket.employeeName}</td>
                <td className="p-2 border border-slate-300">
                  <Popup
                    trigger={
                      <Trash2
                        size={18}
                        className="text-red-400 cursor-pointer hover:text-red-800 hover:rounded-full hover:w-6 hover:h-6 transition-all"
                      />
                    }
                    position="center center"
                    modal
                    nested
                    overlayStyle={{background:"rgba(0,0,0,0.7)"}}
                  >
                    {(close) => (
                      <div className="max-width p-4 bg-zinc-100 rounded shadow-xl max-w-md mx-auto border border-slate-300">
                        <h1 className="mb-4 sm:text-sm lg:text-xl font-semibold">Delete Ticket</h1>
                        <p className="md:text-md mb-4">
                          The ticket will be deleted permanently. This action cannot be undone.
                        </p>
                        <p className="md:text-md mb-4">
                          Are you sure you want to delete this ticket?
                        </p>
                        <div className="flex justify-end space-x-4">
                          <button
                            onClick={close}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              deleteTicket(ticket.id, loadData);
                              close();
                            }}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TicketTable;