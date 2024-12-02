import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function Main() {
  return (
    <div className="px-8 md:px-16 mt-8 flex items-center justify-start space-x-2 max-w-7xl mx-auto relative">
      <Image
        src="/home/bg_background.png"
        className="absolute hidden md:inline object-contain -top-24 right-3"
        width={1000}
        height={1000}
        alt="Background image"
      />
      <div className="flex flex-col space-y-8 z-10">
        <h1 className="text-4xl md:text-7xl tracking-wide font-extrabold text-white">
          Movie With Reviews
        </h1>
        <p className="text-lightGrey md:text-lg">
          Watch, comment and rate the movies. Read other audience’s reviews and
          create your personal watching list.
        </p>

        <Link href={"/signup"}>
          <Button className="bg-secondaryOrange px-6 py-4 md:px-8 md:py-6 
            md:text-lg w-1/3 font-semibold hover:bg-white hover:text-primaryDark">
            Join Now
          </Button>
        </Link>
      </div>

      {/* Background Image */}
      <div className="hidden md:inline z-10">
        <Image
          src="/home/bg_home.png"
          className="object-contain"
          width={1000}
          height={1000}
          alt="Home Image"
        />
      </div>
    </div>
  );
}

export default Main;
