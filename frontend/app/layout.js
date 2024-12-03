import Navbar from "@/components/Navbar";
import "./globals.css";
import { Poppins } from "next/font/google"
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800']
})

export const metadata = {
  title: "Moviegraf",
  description: "Movie Ratings & Reviews",
};

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-primaryDark scrollbar scrollbar-thumb-secondaryOrange scrollbar-track-white-200`}
      >
        <Navbar />
        
        {modal}
        {children}

        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
