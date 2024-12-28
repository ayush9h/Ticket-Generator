import axios from "axios"; 
async function fetchTableData(){
  let response = await axios.get(process.env.BACKEND_URL)
  return response.data
}

async function TicketTable() {  
  let data = await fetchTableData();
  return (
    <div className="max-width mt-10 mb-10 p-5 bg-white border border-zinc-400 rounded-md shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold"> Tickets</h2>
      </div>
        <div className="overflow-x-auto">
          <table className="min-w-full md:w-auto">
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
        </div>
    </div>
  );
}

export default TicketTable;