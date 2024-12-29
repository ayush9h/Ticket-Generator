import Image from "next/image";

export default function Navbar() {
  return <>
    <header className='p-5 shadow-xl bg-indigo-800'>
        <nav className='max-width flex justify-between content-center'>
          <div className='flex justify-between text-center content-center'>
            <Image src='/logo.jpg' width={45} height={40} alt="dummy-image" priority />
          </div>
          <div className="text-center justify-center flex content-center">
              <h1 className="text-sm ml-3 font-bold mt-2 text-slate-200 md:text-md sm:text-xl">TATA MOTORS PASSENGER VEHICLES LTD.</h1>
          </div>
        </nav>
      </header>
  </>;
}
