import {Montserrat} from "next/font/google"
import "./globals.css";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: "CMS DWM Data Capturing System - TMPVL Pune",
  description: "Shopwise machine data for daily review.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        lang="en" className={montserrat.className}
      >
        <Toaster position="top-center"/>
        {children}
      </body>
    </html>
  );
}
