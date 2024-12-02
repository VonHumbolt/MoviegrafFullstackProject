import { UsersIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

function RatedMovieCard({ title, director, count, coverImage, cardStyle }) {
  return (
    <div
      className={`${cardStyle} h-fit flex flex-col px-8 py-6 md:p-5 shadow-md border border-white/10 rounded-xl cursor-pointer`}
    >
      <Image
        src={coverImage}
        className="object-contain"
        width={200}
        height={500}
        alt="rated image"
      />
      <p className="text-white font-semibold text-lg mt-3">{title}</p>
      <p className="text-lightGrey">{director}</p>
      <div className="flex space-x-2 items-center mt-3 text-lightGrey">
        <div className="p-2 rounded-full bg-gradient-to-b from-secondaryOrange/80 to-[#823402]/40">
          <UsersIcon size={16} />
        </div>
        <p className="text-sm">{count} User's Rate</p>
      </div>
    </div>
  );
}

export default RatedMovieCard;
