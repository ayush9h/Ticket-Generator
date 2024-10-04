import Image from "next/image";

export default function Navbar() {
  return <>
    <header className='p-5 shadow-xl bg-white'>
        <nav className='max-width flex justify-between content-center'>
          <div className='flex justify-between text-center content-center'>
            <Image src='/logo.jpg' width={40} height={40} alt="dummy-image" priority />
            <div className="text-center justify-center flex content-center">
              <h1 className="text-xl ml-3 font-semibold mt-2">TATA MOTORS</h1>
            </div>
          </div>
          
        </nav>
      </header>
  </>;
}
