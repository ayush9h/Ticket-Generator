import CreateRequest from "./components/CreateRequest";
import PendingRequest from "./components/PendingRequest";


export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center content-center text-center">
        <h1 className="text-5xl font-semibold mt-5 mb-10">USB Activation Request</h1>
      </div>
      <div className='grid gap-20 grid-cols-2'>
       
        <CreateRequest/>
        {/* Observation Grid */}
        <PendingRequest/>
      </div>
    </>
  );
}
