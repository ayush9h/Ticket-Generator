"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const [loggedUser, setLoggedUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (storedUser?.userMail) {
      setLoggedUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    router.push("/login");
  };

  return (
    <header className="p-5 backdrop-blur-lg bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 shadow-lg border-b border-blue-500 sticky top-0 z-50">
      <nav className="max-width flex justify-between items-center">

        <div className="flex items-center space-x-3">
          <Image
            src="/logo.jpg"
            width={40}
            height={35}
            alt="Tata Motors Logo"
            priority
          />
          <h1 className="font-semibold text-white md:text-md sm:text-sm lg:text-xl tracking-wide">
            TATA MOTORS PASSENGER VEHICLES LTD.
          </h1>
        </div>


        {loggedUser && (
          <div className="flex items-center space-x-4">
            <span className="text-white ">
              {loggedUser.userMail}
            </span>
            <button
              onClick={handleLogout}
              className="bg-white rounded-full w-7 h-7 flex justify-center items-center hover:bg-gray-200 transition-all"
            >
              <LogOut className="w-4 h-4 ml-1"/>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
