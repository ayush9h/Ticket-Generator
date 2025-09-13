"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";
import Popup from "reactjs-popup";
import { Trash2,  DownloadIcon, ChevronLeft, ChevronRight } from "lucide-react";


const socket = io(process.env.NEXT_PUBLIC_API_URL)

async function fetchTableData(currentPage) {

  let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets?page=${currentPage}`);
  return response.data;
}

const deleteTicket = async (id) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets/delete/${id}`);
    toast.success("Ticket deleted successfully");
  } catch (error) {
    toast.error("Failed to delete the ticket.");
  }
};

export default function TicketTable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPages] = useState(1)

  const loadData = async () => {
    let newData = await fetchTableData(currentPage);
    setTotalPages(newData.totalPages)
    setData(newData.tickets);
  };

  const handleNextPage = ()=>{
    if(currentPage < totalPage){
      setCurrentPage(currentPage + 1);
    } 
  }

  const handlePrevPage = ()=>{
    if(currentPage > 1 ){
      setCurrentPage(currentPage - 1);
    }

  }

  useEffect(() => {
    loadData();

    socket.on("ticketCreated", (newTicket)=>{
      if (currentPage === 1) {
        setData((prev) => [newTicket, ...prev]);
      }
    })

     socket.on("ticketDeleted", ({ id }) => {
      setData((prev) => prev.filter((ticket) => ticket._id !== id));
    });

    return () => {
      socket.off("ticketCreated");
      socket.off("ticketDeleted");
    };

  }, [currentPage]);

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
    <div className="max-width mt-10 mb-10">
  
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
        <h2 className="font-bold text-lg sm:text-xl">Tickets</h2>
        <div className="flex gap-3">
          <button
            onClick={exportToExcel}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            <DownloadIcon size={16} className="mr-2" /> Export
          </button>
        </div>
      </div>

 
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-blue-50 sticky top-0">
            <tr>
              {[
                "Shop Name",
                "Safety Issue",
                "Prod Target",
                "Prod Actual",
                "Affected DN. Time",
                "Gross DN. Time",
                "Major Breakdown",
                "Employee ID",
                "Employee Name",
                "Actions",
              ].map((header) => (
                <th key={header} className="p-3 font-semibold border-b border-gray-200">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500">
                  No tickets found.
                </td>
              </tr>
            ) : (
              data.map((ticket) => (
                <tr
                  key={ticket._id}
                  className="hover:bg-gray-50 transition-colors even:bg-gray-50"
                >
                  <td className="p-3 border-b">{ticket.shopName}</td>
                  <td className="p-3 border-b">{ticket.safetyIssue}</td>
                  <td className="p-3 border-b">{ticket.prodTarget}</td>
                  <td className="p-3 border-b">{ticket.prodActual}</td>
                  <td className="p-3 border-b">{ticket.affectedDnTime}</td>
                  <td className="p-3 border-b">{ticket.grossDnTime}</td>
                  <td className="p-3 border-b">{ticket.majorBreakdown}</td>
                  <td className="p-3 border-b">{ticket.employeeId}</td>
                  <td className="p-3 border-b">{ticket.employeeName}</td>
                  <td className="p-3 border-b">
                    <Popup
                      trigger={
                        <Trash2
                          size={18}
                          className="text-red-500 cursor-pointer hover:text-red-700"
                        />
                      }
                      position="center center"
                      modal
                      nested
                      overlayStyle={{ background: "rgba(0,0,0,0.6)" }}
                    >
                      {(close) => (
                        <div className="p-5 bg-white rounded-lg shadow-lg max-w-sm mx-auto">
                          <h1 className="mb-2 text-lg font-semibold">Delete Ticket</h1>
                          <p className="text-sm text-gray-600 mb-4">
                            This ticket will be permanently deleted. This action cannot be undone.
                          </p>
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={close}
                              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                deleteTicket(ticket._id);
                                close();
                              }}
                              className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
      </div>
        
    
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePrevPage}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all"
        >
          <ChevronLeft size={16} />
          Prev
        </button>

        <span className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg">
          Page {currentPage} of {totalPage}
        </span>

        
        <button
          onClick={handleNextPage}
        
          className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>

    </div>
  );
}
