import { FilmIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function DirectorMovieCard({ movieId, title, coverImage }) {
  return (
    <Link href={"/movie/" + movieId}>
      <div className="min-w-[200px] md:min-w-fit">
        <div className="relative cursor-pointer hover:scale-105 transform duration-200 ease-in-out">
          <Image
            src={"/movieImagesUpload/" + coverImage}
            width={200}
            height={500}
            className="object-contain"
            alt="bg image"
          />
          <div className="absolute bottom-0 rounded-b-lg w-full py-8 backdrop-blur-sm bg-primaryDark/40" />
          <div className="absolute bottom-3 w-full text-white text-center">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 text-white shadow-lg
            bg-gradient-to-b from-secondaryPurple/80 to-[#1E0834]/60 rounded-full"
          >
            <FilmIcon size={24} />
          </div>
        </div>

        <div className="relative h-5 rounded-md mt-5 mx-1 blur-md">
          <Image
            src={"/movieImagesUpload/" + coverImage}
            layout="fill"
            alt="blur image"
          />
        </div>
      </div>
    </Link>
  );
}

export default DirectorMovieCard;
