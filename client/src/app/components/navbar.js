import Image from "next/image";

export default function Navbar() {
  return <>
    <header className='p-5 shadow-xl bg-indigo-800'>
        <nav className='max-width flex justify-between content-center'>
          <div className='flex justify-between text-center content-center'>
            <Image src='/logo.jpg' width={45} height={40} className="object-contain sm:w-7 sm:h-7 md:w-7 md:h-7 xl:w-10 xl:h-10" alt="dummy-image" priority />
          </div>
          <div className="text-center justify-center flex content-center">
              <h1 className="ml-3 font-bold mt-2 text-slate-200 md:text-md sm:text-sm lg:text-xl">TATA MOTORS PASSENGER VEHICLES LTD.</h1>
          </div>
        </nav>
      </header>
  </>;
}
