import Navbar from "./components/navbar";
import Ticket from "./components/ticket";
import TicketTable from "./components/table"
import { Suspense } from "react";
import Loading from "./components/loading";

function Home() {
  return (
    <>
      <Navbar />
      <div className="max-width flex justify-center items-center text-center">
        <h1 className="text-xl font-semibold mt-12 sm:text-md md:text-3xl ">CMS DWM Data Capturing System - TMPVL Pune </h1>
      </div>
      <Ticket />
      <Suspense fallback={<Loading/>}>
      <TicketTable />
      </Suspense>
    </>
  );
}

export default Home
