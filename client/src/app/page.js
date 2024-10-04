import Navbar from "./components/navbar";
import Ticket from "./components/ticket";
import TicketTable from "./components/table"

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="max-width flex justify-center items-center text-center">
        <h1 className="text-3xl font-semibold mt-12">CMS DWM Data Capturing System - TMPV Pune </h1>
      </div>
      <Ticket />
      <TicketTable />
    </>
  );
}
