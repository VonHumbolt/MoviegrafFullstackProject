import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { FacebookIcon, TwitterIcon, YoutubeIcon } from "lucide-react";

function Footer() {
  return (
    <div className="max-w-7xl mx-auto px-8 md:px-16 mt-8 md:mt-48">
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row space-x-4 md:space-x-0 space-y-5 md:space-y-0
         justify-between items-center md:items-start">
        <div className="flex space-x-2 items-center">
          <Image
            src="/home/app_icon.png"
            width={32}
            height={32}
            alt="app_icon"
          />
          <h1 className="text-white font-bold text-lg md:text-xl">Moviegraf</h1>
        </div>

        <div className="flex space-x-8 md:justify-evenly md:space-x-0 flex-1 mt-1">
          <div className="text-[#B4A9A9]">
            <h3 className="text-white font-semibold text-base md:text-lg">
              Get Started
            </h3>
            <div className="mt-12 space-y-4 text-sm md:text-base">
              <p className="cursor-pointer hover:text-white">Download App</p>
              <p className="cursor-pointer hover:text-white">New Releases</p>
              <p className="cursor-pointer hover:text-white">Originals</p>
              <p className="cursor-pointer hover:text-white">Plans</p>
            </div>
          </div>
          <div className="text-[#B4A9A9]">
            <h3 className="text-white font-semibold text-base md:text-lg">Account</h3>
            <div className="mt-12 space-y-4 text-sm md:text-base">
                <Link href={"/login"}>
                    <p className="cursor-pointer hover:text-white">Sign in</p>
                </Link>
              <p className="cursor-pointer hover:text-white">Platform</p>
              <p className="cursor-pointer hover:text-white">Support</p>
            </div>
          </div>
          <div className="text-[#B4A9A9]">
            <h3 className="text-white font-semibold text-base md:text-lg">Moviegraf</h3>
            <div className="mt-12 space-y-4 text-sm md:text-base">
              <p className="cursor-pointer hover:text-white">Partners</p>
              <p className="cursor-pointer hover:text-white">Careers</p>
              <p className="cursor-pointer hover:text-white">Press</p>
            </div>
          </div>
        </div>

        <Link href={"/signup"}>
          <Button
            className="bg-secondaryOrange px-6 py-4 md:px-8 md:py-5 
            font-medium hover:bg-white hover:text-primaryDark hidden md:flex"
          >
            Sign up
          </Button>
        </Link>
      </div>

      {/* Section 2 */}
      <p className="mt-12 text-sm text-[#B4A9A9] text-center">
        Follow us using with our social media accounts for learning news and our
        growing plans
      </p>
      <div className="flex mt-4 space-x-4 justify-center text-[#B4A9A9]">
        <YoutubeIcon className="cursor-pointer hover:text-white" size={24}/>
        <TwitterIcon className="cursor-pointer hover:text-white" size={24}/>
        <FacebookIcon className="cursor-pointer hover:text-white" size={24}/>
      </div>

      <hr className="my-12 border-[#B4A9A9] w-4/5 mx-auto" />

        <div className="flex md:px-36 mb-8 justify-between text-[#B4A9A9] text-sm text-center">
            <p>© Moviegraf 2024</p>
            <p>Cookie Settings</p>
            <p>Terms and conditions</p>
            <p>Privacy policy</p>
        </div>
    </div>
  );
}

export default Footer;
