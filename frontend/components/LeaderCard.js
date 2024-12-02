import { MoveRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

function LeaderCard({ title, coverImage, marginTop }) {
  return (
    <div
      className={`${marginTop} min-w-[200px] h-fit flex flex-col px-8 py-6 md:p-5 bg-gradient-to-b from-white/10 to-white/5 shadow-md border border-white/10 rounded-xl cursor-pointer active:scale-95 hover:scale-105 transform duration-200 ease-in-out`}
    >
      <Image
        src={coverImage}
        className="object-contain"
        width={200}
        height={500}
        alt="Leader Image"
      />
      <p className="text-white font-medium mt-3 text-center line-clamp-1">{title}</p>
      <div className="flex space-x-2 items-center justify-center mt-2 text-lightGrey">
        <p className="text-sm">Explore</p>
        <MoveRightIcon size={16} />
      </div>
    </div>
  );
}

export default LeaderCard;
