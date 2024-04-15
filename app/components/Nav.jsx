import Link from "next/link";
import Image from "next/image";
export default function Nav() {
  return (
    <>
      <header className='w-100 pt-5 pb-5'>
        <nav className='flex justify-between content-center'>
          <div className='flex justify-between text-center content-center'>
            <Image src='/logo.jpg' width={40} height={40} alt="dummy-image" priority />
            <div className="text-center justify-center flex content-center">
              <h1 className="text-xl ml-3 font-semibold mt-2">TATA MOTORS</h1>
            </div>
          </div>
          <div>
            <Link href='/'>
              <h1 className='text-md text-white bg-black p-2r rounded-md px-2 py-2'>
                Sign In
              </h1>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
